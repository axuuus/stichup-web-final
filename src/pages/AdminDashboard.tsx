import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { initEmailJS, sendEmail } from '@/lib/emailjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Reply {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  replies: Reply[];
}

interface Visit {
  id: string;
  path: string;
  timestamp: string;
  userAgent: string;
  ip?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [recentVisits, setRecentVisits] = useState<Visit[]>([]);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyTitle, setReplyTitle] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyFrom, setReplyFrom] = useState('StichUp Support');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    document.title = "StichUp | Admin Dashboard";
    const isAdmin = localStorage.getItem('isAdminLoggedIn');
    
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Please login to access the admin dashboard",
        variant: "destructive"
      });
      navigate('/admin');
      return;
    }

    initEmailJS();

    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    const storedVisits = localStorage.getItem('recentVisits');
    if (storedVisits) {
      setRecentVisits(JSON.parse(storedVisits));
    }
  }, [navigate, toast]);

  const handleDelete = (id: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    toast({
      title: "Message Deleted",
      description: "Contact message has been removed"
    });
  };

  const handleReply = (message: ContactMessage) => {
    setSelectedMessage(message);
    setReplyDialogOpen(true);
  };

  const handleViewHistory = (message: ContactMessage) => {
    setSelectedMessage(message);
    setHistoryDialogOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedMessage) return;

    setIsSending(true);
    try {
      const result = await sendEmail(
        selectedMessage.email,
        replyText,
        selectedMessage.name,
        replyTitle,
        replyFrom
      );

      if (result.success) {
        const newReply: Reply = {
          id: Date.now().toString(),
          from: replyFrom,
          subject: replyTitle,
          message: replyText,
          date: new Date().toISOString()
        };

        const updatedMessages = messages.map(msg => {
          if (msg.id === selectedMessage.id) {
            return {
              ...msg,
              replies: [...(msg.replies || []), newReply]
            };
          }
          return msg;
        });

        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

        toast({
          title: "Reply Sent",
          description: "Your reply has been sent successfully"
        });
        setReplyDialogOpen(false);
        setReplyTitle('');
        setReplyText('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const clearVisits = () => {
    setRecentVisits([]);
    localStorage.setItem('recentVisits', JSON.stringify([]));
    toast({
      title: "Visits Cleared",
      description: "Recent visits history has been cleared"
    });
  };

  return (
    <div className="relative min-h-screen pt-[8.5rem] pb-16 px-6 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 grid-background"></div>
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-2 animate-slide-in backdrop-blur-sm">
            ADMIN DASHBOARD
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Panel
          </h1>
        </div>

        {/* Recent Visits Card */}
        <Card className="bg-secondary/30 backdrop-blur-sm border-secondary/50 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Visits</CardTitle>
            <Button variant="outline" size="sm" onClick={clearVisits}>
              Clear History
            </Button>
          </CardHeader>
          <CardContent>
            {recentVisits.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No recent visits recorded
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device Info</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentVisits.slice(0, 10).map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell>{new Date(visit.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{visit.path}</TableCell>
                      <TableCell>{visit.ip || 'N/A'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[400px]">
                            <div className="p-4">
                              <pre className="text-xs whitespace-pre-wrap break-words">
                                {visit.userAgent}
                              </pre>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Contact Messages Card */}
        <Card className="bg-secondary/30 backdrop-blur-sm border-secondary/50">
          <CardHeader>
            <CardTitle>Contact Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No contact messages yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Replies</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                      <TableCell>
                        {message.replies?.length || 0}
                        {message.replies?.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => handleViewHistory(message)}
                          >
                            View
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReply(message)}
                          >
                            Reply
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(message.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Reply Dialog */}
        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reply to Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="text-sm font-medium mb-1">Original Message:</div>
                <div className="text-sm">{selectedMessage?.message}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">From:</label>
                <Input
                  value={replyFrom}
                  onChange={(e) => setReplyFrom(e.target.value)}
                  placeholder="Your name or title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject:</label>
                <Input
                  value={replyTitle}
                  onChange={(e) => setReplyTitle(e.target.value)}
                  placeholder="Reply subject"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message:</label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setReplyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendReply}
                disabled={isSending || !replyText.trim() || !replyTitle.trim()}
              >
                {isSending ? 'Sending...' : 'Send Reply'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* History Dialog */}
        <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Conversation History</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="text-sm font-medium mb-1">Original Message:</div>
                <div className="text-sm mb-2">{selectedMessage?.message}</div>
                <div className="text-xs text-muted-foreground">
                  From: {selectedMessage?.name} ({selectedMessage?.email})
                  <br />
                  Date: {selectedMessage?.date && new Date(selectedMessage.date).toLocaleString()}
                </div>
              </div>
              
              <div className="space-y-4">
                {selectedMessage?.replies?.map((reply) => (
                  <div key={reply.id} className="bg-primary/5 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Subject: {reply.subject}
                    </div>
                    <div className="text-sm mb-2">{reply.message}</div>
                    <div className="text-xs text-muted-foreground">
                      From: {reply.from}
                      <br />
                      Date: {new Date(reply.date).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setHistoryDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setHistoryDialogOpen(false);
                  handleReply(selectedMessage!);
                }}
              >
                Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
