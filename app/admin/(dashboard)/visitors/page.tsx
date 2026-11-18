import Link from "next/link";
import { deleteVisitors, getVisitors } from "@/actions/visitors";
import { SearchForm } from "@/components/admin/SearchForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const page = Math.max(1, Number(params.page) || 1);
  const result = await getVisitors({
    page,
    pageSize: 20,
    q,
    role: typeof params.role === "string" ? params.role : undefined,
    source: typeof params.source === "string" ? params.source : undefined,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Visitors</CardTitle>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {result.total} registrations
        </p>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <SearchForm placeholder="Search name, email or phone" />
        <Table className="min-w-190">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Country / city</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.items.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  {row.country}
                  {row.city ? ` / ${row.city}` : ""}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{row.role}</Badge>
                </TableCell>
                <TableCell>{row.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <form
                    action={async () => {
                      "use server";
                      await deleteVisitors([row.id]);
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
            No visitors found.
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
                href={`/admin/visitors?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              >
                Previous
              </Link>
            )}
            {page < result.pages && (
              <Link
                className="inline-flex h-8 items-center rounded-md border px-3 text-sm"
                href={`/admin/visitors?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
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
