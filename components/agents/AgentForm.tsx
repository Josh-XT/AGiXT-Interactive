/* components/agents/AgentForm.tsx */
'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createAgent } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/layout/toast';

type FormData = {
  name: string;
  provider: string;
  model: string;
  baseUrl: string;
  temperature: number;
  maxTokens: number;
};

export default function AgentForm() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      provider: 'ollama',
      model: 'llama3:8b-instruct-q4_K_M',
      baseUrl: 'http://host.docker.internal:11434',
      temperature: 0.7,
      maxTokens: 2048,
    },
  });
  const router = useRouter();

  async function onSubmit(data: FormData) {
    const ok = await createAgent({
      name: data.name,
      description: `${data.provider} – ${data.model}`,
      config: {
        PROVIDER: data.provider,
        MODEL: data.model,
        BASE_URL: data.baseUrl,
        TEMPERATURE: data.temperature,
        MAX_TOKENS: data.maxTokens,
      },
    });

    if (ok) {
      toast({ title: 'Success', description: 'Agent created 🎉', variant: 'default' });
      router.push('/chat'); // 跳回聊天页
    } else {
      toast({ title: 'Error', description: 'Create failed', variant: 'destructive' });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Agent Name</Label>
        <Input {...register('name', { required: true })} placeholder="local-llama" />
      </div>

      <div>
        <Label>Provider</Label>
        <Input {...register('provider', { required: true })} placeholder="ollama" />
      </div>

      <div>
        <Label>Model Tag</Label>
        <Input {...register('model', { required: true })} placeholder="llama3:8b-instruct-q4_K_M" />
      </div>

      <div>
        <Label>Base URL</Label>
        <Input {...register('baseUrl', { required: true })} placeholder="http://host.docker.internal:11434" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Temperature</Label>
          <Input type="number" step="0.1" {...register('temperature', { valueAsNumber: true })} />
        </div>
        <div>
          <Label>Max Tokens</Label>
          <Input type="number" {...register('maxTokens', { valueAsNumber: true })} />
        </div>
      </div>

      <Button disabled={formState.isSubmitting} className="w-full">
        {formState.isSubmitting ? 'Creating…' : 'Create'}
      </Button>
    </form>
  );
}