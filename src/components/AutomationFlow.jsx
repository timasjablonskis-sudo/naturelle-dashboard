import React from 'react'
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { PhoneMissed, Globe, Instagram, Mail, MessageSquare, Calendar, Star, Zap, Brain } from 'lucide-react'

function GlassNode({ data }) {
  const Icon = data.icon
  const isCenter = data.type === 'center'

  return (
    <div
      style={{
        background: isCenter ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.03)',
        border: isCenter ? '1px solid rgba(59,130,246,0.4)' : `1px solid rgba(${data.colorRgb || '255,255,255'},0.15)`,
        borderRadius: 14,
        padding: isCenter ? '14px 20px' : '10px 16px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isCenter ? '0 0 24px rgba(59,130,246,0.15), 0 4px 20px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        minWidth: isCenter ? 120 : 100,
        cursor: 'default', userSelect: 'none',
      }}
    >
      <Handle type="target" position={Position.Left}
        style={{ background: '#3b82f6', border: 'none', width: 6, height: 6, opacity: data.hideLeft ? 0 : 1 }} />
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isCenter ? 'rgba(59,130,246,0.15)' : `rgba(${data.colorRgb || '255,255,255'},0.08)`,
      }}>
        <Icon size={16} style={{
          color: isCenter ? '#3b82f6' : `rgb(${data.colorRgb || '255,255,255'})`,
          filter: isCenter ? 'drop-shadow(0 0 4px rgba(59,130,246,0.8))' : 'none',
        }} />
      </div>
      <span style={{
        color: isCenter ? '#3b82f6' : 'rgba(255,255,255,0.85)',
        fontSize: isCenter ? 12 : 11,
        fontFamily: 'Space Mono, monospace',
        textAlign: 'center',
        fontWeight: isCenter ? 600 : 400,
        letterSpacing: '0.02em', lineHeight: 1.3,
      }}>
        {data.label}
      </span>
      {data.stat && (
        <span style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
          {data.stat}
        </span>
      )}
      <Handle type="source" position={Position.Right}
        style={{ background: '#3b82f6', border: 'none', width: 6, height: 6, opacity: data.hideRight ? 0 : 1 }} />
    </div>
  )
}

const nodeTypes = { glass: GlassNode }

const initialNodes = [
  { id: 'trigger-1', type: 'glass', position: { x: 0, y: 0 }, data: { label: 'Missed Call', icon: PhoneMissed, colorRgb: '245,158,11', stat: '247 triggers', hideLeft: true } },
  { id: 'trigger-2', type: 'glass', position: { x: 0, y: 100 }, data: { label: 'Website Visit', icon: Globe, colorRgb: '59,130,246', stat: '312 triggers', hideLeft: true } },
  { id: 'trigger-3', type: 'glass', position: { x: 0, y: 200 }, data: { label: 'Instagram DM', icon: Instagram, colorRgb: '244,114,182', stat: '189 triggers', hideLeft: true } },
  { id: 'trigger-4', type: 'glass', position: { x: 0, y: 300 }, data: { label: 'Form Fill', icon: Mail, colorRgb: '167,139,250', stat: '94 triggers', hideLeft: true } },
  { id: 'ai-brain', type: 'glass', position: { x: 200, y: 120 }, data: { label: 'Aria AI', icon: Brain, type: 'center' } },
  { id: 'action-1', type: 'glass', position: { x: 400, y: 0 }, data: { label: 'Text-Back', icon: MessageSquare, colorRgb: '74,222,128', stat: '8s response', hideRight: true } },
  { id: 'action-2', type: 'glass', position: { x: 400, y: 90 }, data: { label: 'Email Follow-Up', icon: Mail, colorRgb: '167,139,250', stat: '60s send', hideRight: true } },
  { id: 'action-3', type: 'glass', position: { x: 400, y: 180 }, data: { label: 'Appointment', icon: Calendar, colorRgb: '59,130,246', stat: 'AI booked', hideRight: true } },
  { id: 'action-4', type: 'glass', position: { x: 400, y: 270 }, data: { label: 'Review Request', icon: Star, colorRgb: '245,158,11', stat: '2h post-visit', hideRight: true } },
  { id: 'action-5', type: 'glass', position: { x: 400, y: 360 }, data: { label: 'Re-Engagement', icon: Zap, colorRgb: '139,92,246', stat: '24h sequence', hideRight: true } },
]

const edgeStyle = { stroke: 'rgba(59,130,246,0.35)', strokeWidth: 1.5 }

const initialEdges = [
  { id: 'e1', source: 'trigger-1', target: 'ai-brain', animated: true, style: edgeStyle },
  { id: 'e2', source: 'trigger-2', target: 'ai-brain', animated: true, style: edgeStyle },
  { id: 'e3', source: 'trigger-3', target: 'ai-brain', animated: true, style: edgeStyle },
  { id: 'e4', source: 'trigger-4', target: 'ai-brain', animated: true, style: edgeStyle },
  { id: 'e5', source: 'ai-brain', target: 'action-1', animated: true, style: edgeStyle },
  { id: 'e6', source: 'ai-brain', target: 'action-2', animated: true, style: edgeStyle },
  { id: 'e7', source: 'ai-brain', target: 'action-3', animated: true, style: edgeStyle },
  { id: 'e8', source: 'ai-brain', target: 'action-4', animated: true, style: edgeStyle },
  { id: 'e9', source: 'ai-brain', target: 'action-5', animated: true, style: edgeStyle },
]

export default function AutomationFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/[0.06]">
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView fitViewOptions={{ padding: 0.3 }}
        panOnDrag={false} zoomOnScroll={false} zoomOnPinch={false}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        style={{ background: 'transparent' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255,255,255,0.02)" gap={40} size={1} />
      </ReactFlow>
    </div>
  )
}
