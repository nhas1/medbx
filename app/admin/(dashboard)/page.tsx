import Link from "next/link";
import { ArrowRight, Handshake, Users } from "lucide-react";
import { getSponsorCount } from "@/actions/sponsors";
import { getVisitorCount } from "@/actions/visitors";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminOverviewPage() {
  const [visitorCount, sponsorCount] = await Promise.all([
    getVisitorCount(),
    getSponsorCount(),
  ]);

  const stats = [
    {
      title: "Visitors",
      description: "Total registrations",
      count: visitorCount,
      href: "/admin/visitors",
      linkLabel: "View visitors",
      icon: Users,
    },
    {
      title: "Sponsors",
      description: "Total sponsor leads",
      count: sponsorCount,
      href: "/admin/sponsors",
      linkLabel: "View sponsors",
      icon: Handshake,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Overview
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Welcome to the MEDBX admin panel.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.href} className="transition-colors hover:bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <stat.icon className="size-4 text-muted-foreground" />
                {stat.title}
              </CardTitle>
              <CardDescription>{stat.description}</CardDescription>
              <CardAction>
                <p className="font-heading text-2xl font-semibold tabular-nums sm:text-3xl">
                  {stat.count.toLocaleString()}
                </p>
              </CardAction>
            </CardHeader>
            <CardFooter>
              <Link
                href={stat.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {stat.linkLabel}
                <ArrowRight className="size-3.5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
