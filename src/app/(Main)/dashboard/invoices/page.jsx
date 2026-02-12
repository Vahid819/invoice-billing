import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatItem from "@/components/invoices/stat-item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import SummaryCard from "@/components/invoices/summary-card";
import StatusBadge from "@/components/invoices/status-badge";
import { Download, RefreshCw, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    id: "INV-1023",
    customer: "John Doe",
    amount: "₹2,500",
    status: "Paid",
    due: "Dec 12, 2024",
  },
  {
    id: "INV-1024",
    customer: "Acme Corp",
    amount: "₹4,200",
    status: "Pending",
    due: "Dec 20, 2024",
  },
  {
    id: "INV-1025",
    customer: "Sarah Smith",
    amount: "₹1,800",
    status: "Overdue",
    due: "Nov 28, 2024",
  },
];

export default function page() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      {/* PAGE HEADER */}
      <Card className="glass">
        <CardContent className="p-6 space-y-6">
          {/* Breadcrumb */}
          <p className="text-xs text-slate-400">
            Sales & Payment <span className="mx-1">/</span> Invoices
          </p>

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-white">Invoices</h1>
            <p className="flex items-center justify-center gap-2 text-sm text-slate-400">
              Last update a min ago
              <RefreshCw className="h-3 w-3" />
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>

            <Button variant="outline" className="border-white/20">
              <Download className="h-4 w-4 mr-2" />
              Export as .CSV
            </Button>
          </div>

          {/* Summary Stats */}
          <Separator />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem label="Overdue" value="$7,800" sub=".50" />

            <StatItem label="Due within next 30 days" value="$11,250" />

            <StatItem
              label="Average time to get paid"
              value="34"
              suffix="days"
            />

            <StatItem label="Upcoming Payout" value="$3,450" sub=".50" />
          </div>
        </CardContent>

      {/* FILTERS */}
      
        <CardContent className="flex flex-wrap gap-4 p-4">
          <Button variant="outline">All</Button>
          <Button variant="outline">Paid</Button>
          <Button variant="outline">Pending</Button>
          <Button variant="outline">Overdue</Button>

          <div className="ml-auto w-full sm:w-64">
            <Input placeholder="Search invoice or customer..." />
          </div>
        </CardContent>

      {/* TABLE */}
      <Separator />
        <CardHeader>
          <CardTitle className="text-sm text-white">Invoice List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium text-white">
                    {invoice.id}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {invoice.customer}
                  </TableCell>
                  <TableCell className="text-white">{invoice.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {invoice.due}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {/* PAGINATION */}
      <div className="flex items-center justify-between text-sm mx-4 text-slate-400">
        <span>Showing 1–3 of 114 invoices</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
      </Card>
    </div>
  );
}
