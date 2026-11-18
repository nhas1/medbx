import Link from "next/link";
import {
  deleteSponsor,
  getSponsors,
  updateSponsorStatus,
} from "@/actions/sponsors";
import { SearchForm } from "@/components/admin/SearchForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function SponsorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const page = Math.max(1, Number(params.page) || 1);
  const result = await getSponsors({
    page,
    pageSize: 20,
    q,
    status: typeof params.status === "string" ? params.status : undefined,
    tier: typeof params.tier === "string" ? params.tier : undefined,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Sponsor leads</CardTitle>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {result.total} leads
        </p>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 py-1">
        <SearchForm placeholder="Search company, email or phone" />
        <Table className="min-w-245">
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.items.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.company}</TableCell>
                <TableCell>{row.industry}</TableCell>
                <TableCell>{row.contactName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{row.tier || "-"}</Badge>
                </TableCell>
                <TableCell>
                  <form
                    action={async (formData) => {
                      "use server";
                      await updateSponsorStatus(
                        row.id,
                        String(formData.get("status")),
                      );
                    }}
                  >
                    <Select name="status" defaultValue={row.status}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </form>
                </TableCell>
                <TableCell>{row.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <form
                    action={async () => {
                      "use server";
                      await deleteSponsor(row.id);
                    }}
                  >
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {result.items.length === 0 && (
          <p className="py-10 text-center text-muted-foreground">
            No sponsor leads found.
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <span>
            Page {page} of {result.pages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                className="inline-flex h-8 items-center rounded-md border px-3 text-sm"
                href={`/admin/sponsors?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              >
                Previous
              </Link>
            )}
            {page < result.pages && (
              <Link
                className="inline-flex h-8 items-center rounded-md border px-3 text-sm"
                href={`/admin/sponsors?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
