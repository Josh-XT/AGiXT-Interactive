/* app/(chat)/agents/new/page.tsx */
import AgentForm from '@/components/agents/AgentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewAgentPage() {
  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Create New Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <AgentForm />
        </CardContent>
      </Card>
    </div>
  );
}