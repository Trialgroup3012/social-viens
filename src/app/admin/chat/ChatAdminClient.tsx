"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Search,
  RefreshCw,
  Trash2,
  MessageSquare,
  Clock,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Send,
  Bot,
  User as UserIcon,
  Globe,
  Hash,
  Tag,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ScrollArea,
} from "@/components/ui/scroll-area";

// =============================================================================
// Types
// =============================================================================

type ChatSession = {
  id: string;
  sessionId: string;
  messageCount: number;
  status: string;
  firstMessage: string | null;
  lastMessage: string | null;
  visitorIp: string | null;
  userAgent: string | null;
  leadId: string | null;
  createdAt: string;
  updatedAt: string;
};

type ChatMessage = {
  id: string;
  sessionId: string;
  role: string; // "user" | "assistant" | "system"
  content: string;
  tokens: number | null;
  createdAt: string;
};

type SessionsResponse = {
  sessions: ChatSession[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type SessionDetailResponse = {
  session: ChatSession & { id: string };
  messages: ChatMessage[];
};

// =============================================================================
// Constants & helpers
// =============================================================================

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "ended", label: "Ended" },
  { value: "converted", label: "Converted" },
];

function statusBadgeClass(status: string) {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "ended":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "converted":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function truncate(s: string | null, max: number): string {
  if (!s) return "";
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatRelative(iso: string): string {
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return formatDate(iso);
  } catch {
    return iso;
  }
}

// =============================================================================
// Component
// =============================================================================

export default function ChatAdminClient() {
  // Session list state -------------------------------------------------------
  const [sessions, setSessions] = React.useState<ChatSession[]>([]);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(20);
  const [status, setStatus] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [loadingList, setLoadingList] = React.useState(false);

  // Selected session + messages ---------------------------------------------
  const [selectedSessionId, setSelectedSessionId] = React.useState<string | null>(null);
  const [sessionDetail, setSessionDetail] = React.useState<SessionDetailResponse | null>(null);
  const [loadingDetail, setLoadingDetail] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState<string>("active");
  const [savingStatus, setSavingStatus] = React.useState(false);

  // Delete dialog ------------------------------------------------------------
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  // Debounce search input ----------------------------------------------------
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedQ, setDebouncedQ] = React.useState("");

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQ(q);
      setPage(1);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  // Fetch session list -------------------------------------------------------
  const fetchSessions = React.useCallback(async () => {
    setLoadingList(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (status !== "all") params.set("status", status);
      if (debouncedQ.trim()) params.set("q", debouncedQ.trim());
      const res = await fetch(`/api/admin/chat?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load chat sessions");
      const data: SessionsResponse = await res.json();
      setSessions(data.sessions || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load chat sessions");
    } finally {
      setLoadingList(false);
    }
  }, [page, limit, status, debouncedQ]);

  React.useEffect(() => {
    void fetchSessions();
  }, [fetchSessions]);

  // Fetch session detail -----------------------------------------------------
  const fetchDetail = React.useCallback(async (sessionId: string) => {
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/admin/chat/${encodeURIComponent(sessionId)}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to load conversation");
      }
      const data: SessionDetailResponse = await res.json();
      setSessionDetail(data);
      setEditStatus(data.session.status || "active");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to load conversation");
      setSessionDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  const selectSession = (s: ChatSession) => {
    setSelectedSessionId(s.sessionId);
    void fetchDetail(s.sessionId);
  };

  // Update session status ----------------------------------------------------
  const saveStatus = async () => {
    if (!selectedSessionId) return;
    setSavingStatus(true);
    try {
      const res = await fetch(
        `/api/admin/chat/${encodeURIComponent(selectedSessionId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: editStatus }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update status");
      }
      toast.success(`Status updated to "${editStatus}"`);
      // Update both the detail object and the list entry.
      setSessionDetail((prev) =>
        prev ? { ...prev, session: { ...prev.session, status: editStatus } } : prev
      );
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === selectedSessionId ? { ...s, status: editStatus } : s
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSavingStatus(false);
    }
  };

  // Delete session -----------------------------------------------------------
  const openDelete = () => setDeleteOpen(true);

  const confirmDelete = async () => {
    if (!selectedSessionId) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/admin/chat/${encodeURIComponent(selectedSessionId)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete session");
      }
      toast.success("Conversation deleted");
      setSessions((prev) =>
        prev.filter((s) => s.sessionId !== selectedSessionId)
      );
      setSessionDetail(null);
      setSelectedSessionId(null);
      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Auto-scroll message thread to bottom on new load.
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [sessionDetail?.messages.length]);

  // ===========================================================================
  // Render
  // ===========================================================================

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6 md:py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Chat History
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} conversation{total === 1 ? "" : "s"} captured by the AI assistant
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void fetchSessions()}
          disabled={loadingList}
        >
          <RefreshCw className={loadingList ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {/* Top filter bar */}
      <Card className="premium-card mb-4">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search first message, IP, session ID..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Two-column layout: session list + message thread */}
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
        {/* === Session list (left) === */}
        <Card className="premium-card flex flex-col h-[calc(100vh-260px)] min-h-[480px]">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="size-4 text-[#B8860B]" />
              Conversations
            </CardTitle>
          </CardHeader>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {loadingList && sessions.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="text-muted-foreground size-5 animate-spin" />
                </div>
              ) : sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <MessageSquare className="size-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No conversations found.
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    New visitor chats will appear here automatically.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {sessions.map((s) => {
                    const active = s.sessionId === selectedSessionId;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => selectSession(s)}
                          className={[
                            "w-full text-left px-4 py-3 transition-colors outline-none",
                            "focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40",
                            active
                              ? "bg-[#D4AF37]/10 border-l-2 border-l-[#D4AF37]"
                              : "hover:bg-muted/50 border-l-2 border-l-transparent",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                              {s.firstMessage || (
                                <span className="text-muted-foreground italic">
                                  (empty conversation)
                                </span>
                              )}
                            </p>
                            <Badge
                              variant="outline"
                              className={`shrink-0 text-[10px] px-1.5 py-0 ${statusBadgeClass(s.status)}`}
                            >
                              {s.status}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Hash className="size-3" />
                              {s.messageCount} msg{s.messageCount === 1 ? "" : "s"}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3" />
                              {formatRelative(s.updatedAt)}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </ScrollArea>
          </div>
          {/* Pagination */}
          {totalPages > 1 ? (
            <div className="border-t p-3 flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1 || loadingList}
                  aria-label="Previous page"
                >
                  <ArrowLeft className="size-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages || loadingList}
                  aria-label="Next page"
                >
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          ) : null}
        </Card>

        {/* === Message thread (right) === */}
        <Card className="premium-card flex flex-col h-[calc(100vh-260px)] min-h-[480px]">
          {!selectedSessionId || !sessionDetail ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              {loadingDetail ? (
                <>
                  <Loader2 className="size-8 text-muted-foreground/60 mb-3 animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Loading conversation…
                  </p>
                </>
              ) : (
                <>
                  <div className="size-14 rounded-full bg-muted flex items-center justify-center mb-3">
                    <MessageSquare className="size-6 text-muted-foreground/60" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Select a conversation to view messages
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Click any conversation in the list on the left.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Thread header */}
              <CardHeader className="border-b pb-3 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Bot className="size-4 text-[#B8860B] shrink-0" />
                      Conversation
                    </CardTitle>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1" title="Session ID">
                        <Hash className="size-3" />
                        <code className="text-[10px] bg-muted/60 px-1.5 py-0.5 rounded">
                          {sessionDetail.session.sessionId.slice(0, 12)}…
                        </code>
                      </span>
                      {sessionDetail.session.visitorIp ? (
                        <span className="inline-flex items-center gap-1" title="Visitor IP">
                          <Globe className="size-3" />
                          {sessionDetail.session.visitorIp}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        Started {formatDate(sessionDetail.session.createdAt)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={openDelete}
                    className="shrink-0"
                  >
                    <Trash2 className="size-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>

                {/* Status editor */}
                <div className="flex items-center gap-2">
                  <Tag className="size-3.5 text-muted-foreground" />
                  <Select
                    value={editStatus}
                    onValueChange={setEditStatus}
                  >
                    <SelectTrigger className="h-8 w-[140px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="ended">Ended</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => void saveStatus()}
                    disabled={savingStatus || editStatus === sessionDetail.session.status}
                  >
                    {savingStatus ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="size-3.5" />
                    )}
                    Save
                  </Button>
                  <Badge
                    variant="outline"
                    className={`ml-auto text-[10px] ${statusBadgeClass(sessionDetail.session.status)}`}
                  >
                    {sessionDetail.session.status}
                  </Badge>
                </div>
              </CardHeader>

              {/* Message thread body */}
              <div className="flex-1 overflow-hidden bg-muted/20">
                <div
                  ref={scrollRef}
                  className="h-full overflow-y-auto px-4 py-4 space-y-3"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {sessionDetail.messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <p className="text-sm text-muted-foreground">
                        No messages in this conversation.
                      </p>
                    </div>
                  ) : (
                    sessionDetail.messages
                      .filter((m) => m.role !== "system")
                      .map((m) => {
                        const isUser = m.role === "user";
                        return (
                          <div
                            key={m.id}
                            className={`flex gap-2.5 ${
                              isUser ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <div
                              className={`size-7 shrink-0 rounded-full flex items-center justify-center ${
                                isUser
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {isUser ? (
                                <UserIcon className="size-3.5" />
                              ) : (
                                <Bot className="size-3.5" />
                              )}
                            </div>
                            <div
                              className={`max-w-[78%] flex flex-col ${
                                isUser ? "items-end" : "items-start"
                              }`}
                            >
                              <div
                                className={[
                                  "rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words",
                                  isUser
                                    ? "bg-amber-100 text-amber-950 rounded-tr-sm"
                                    : "bg-gray-100 text-gray-900 rounded-tl-sm",
                                ].join(" ")}
                              >
                                {m.content}
                              </div>
                              <span className="mt-1 px-1 text-[10px] text-muted-foreground">
                                {formatTime(m.createdAt)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

              {/* Footer summary */}
              <div className="border-t px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Send className="size-3" />
                  {sessionDetail.messages.filter((m) => m.role !== "system").length} message{sessionDetail.messages.length === 1 ? "" : "s"}
                </span>
                <span>Last update {formatRelative(sessionDetail.session.updatedAt)}</span>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The entire conversation and all
              {" "}
              {sessionDetail?.messages.length ?? 0} message(s) will be
              permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => void confirmDelete()}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete Conversation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
