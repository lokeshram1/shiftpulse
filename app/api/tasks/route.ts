import {NextResponse} from 'next/server';
import {tasks,summary,type Status} from '@/lib/tasks';
export async function GET(){return NextResponse.json({tasks,summary:summary()})}
export async function PATCH(request:Request){const body=await request.json().catch(()=>({}));const task=tasks.find(t=>t.id===body.id);if(!task)return NextResponse.json({error:'Task not found.'},{status:404});if(!['Completed','In Progress','Not Completed'].includes(body.status))return NextResponse.json({error:'Invalid task status.'},{status:400});task.status=body.status as Status;task.comment=typeof body.comment==='string'?body.comment.slice(0,500):task.comment;return NextResponse.json({task,summary:summary()})}
