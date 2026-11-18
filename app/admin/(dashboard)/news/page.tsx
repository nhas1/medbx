import Link from "next/link";
import { deleteNews, getNews } from "@/actions/news";
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

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const posts = await getNews(q);
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div>
          <CardTitle className="text-base sm:text-lg">News</CardTitle>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Manage public news posts.
          </p>
        </div>
        <Link
          className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground sm:w-auto"
          href="/admin/news/new"
        >
          New post
        </Link>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <SearchForm placeholder="Search title or summary" />
        <Table className="min-w-170">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="font-medium">{post.titleEn}</div>
                  <div className="text-xs text-muted-foreground sm:text-sm">
                    {post.titleAr}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{post.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.status === "published" ? "default" : "secondary"
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {post.publishedAt?.toLocaleDateString() || "-"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link
                    className="inline-flex items-center rounded-md border px-3 text-sm bg-accent"
                    href={`/admin/news/${post.id}/edit`}
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteNews(post.id);
                    }}
                  >
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {posts.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No news posts found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
