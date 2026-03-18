import React, { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { PhoneMissed, Globe, Instagram, Mail, MessageSquare, Calendar, Star, Zap, Brain } from 'lucide-react'

function GlassNode({ data }) {
  const Icon = data.icon
  const isCenter = data.type === 'center'
  const [hovered, setHovered] = useState(false)

  const accentColor = isCenter ? '59,130,246' : (data.colorRgb || '255,255,255')

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: isCenter
          ? 'rgba(59,130,246,0.08)'
          : hovered
            ? `rgba(${accentColor},0.06)`
            : 'rgba(255,255,255,0.03)',
        border: isCenter
          ? '1px solid rgba(59,130,246,0.4)'
          : `1px solid rgba(${accentColor},${hovered ? '0.3' : '0.15'})`,
        borderRadius: 16,
        padding: isCenter ? '16px 24px' : '12px 18px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isCenter
          ? '0 0 32px rgba(59,130,246,0.2), 0 4px 24px rgba(0,0,0,0.4)'
          : hovered
            ? `0 0 20px rgba(${accentColor},0.15), 0 4px 20px rgba(0,0,0,0.3)`
            : '0 4px 16px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        minWidth: isCenter ? 160 : 140,
        cursor: 'grab', userSelect: 'none',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease',
      }}
    >
      {/* Pulse ring behind center node */}
      {isCenter && (
        <div style={{
          position: 'absolute', inset: -6,
          borderRadius: 22,
          border: '2px solid rgba(59,130,246,0.3)',
          animation: 'pulse-ring 2s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}

      <Handle type="target" position={Position.Left}
        style={{ background: `rgb(${accentColor})`, border: '2px solid #09090b', width: 8, height: 8, opacity: data.hideLeft ? 0 : 1 }} />

      <div style={{
        width: 36, height: 36, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isCenter ? 'rgba(59,130,246,0.18)' : `rgba(${accentColor},0.12)`,
        transition: 'background 0.2s ease',
      }}>
        <Icon size={18} style={{
          color: `rgb(${accentColor})`,
          filter: isCenter ? 'drop-shadow(0 0 6px rgba(59,130,246,0.8))' : 'none',
        }} />
      </div>

      <span style={{
        color: isCenter ? '#3b82f6' : 'rgba(255,255,255,0.9)',
        fontSize: isCenter ? 13 : 12,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        fontWeight: isCenter ? 600 : 500,
        letterSpacing: '-0.01em', lineHeight: 1.3,
      }}>
        {data.label}
      </span>

      {data.stat && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 4px rgba(16,185,129,0.6)',
            animation: 'simPulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontSize: 10, fontFamily: 'Space Mono, monospace',
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em',
          }}>
            {data.stat}
          </span>
        </div>
      )}

      <Handle type="source" position={Position.Right}
        style={{ background: `rgb(${accentColor})`, border: '2px solid #09090b', width: 8, height: 8, opacity: data.hideRight ? 0 : 1 }} />
    </div>
  )
}

const nodeTypes = { glass: GlassNode }

const initialNodes = [
  { id: 'trigger-1', type: 'glass', position: { x: 0, y: 0 },   data: { label: 'Missed Call',   icon: PhoneMissed,   colorRgb: '245,158,11',  stat: '247 triggers', hideLeft: true } },
  { id: 'trigger-2', type: 'glass', position: { x: 0, y: 110 },  data: { label: 'Website Visit', icon: Globe,         colorRgb: '59,130,246',  stat: '312 triggers', hideLeft: true } },
  { id: 'trigger-3', type: 'glass', position: { x: 0, y: 220 },  data: { label: 'Instagram DM',  icon: Instagram,     colorRgb: '244,114,182', stat: '189 triggers', hideLeft: true } },
  { id: 'trigger-4', type: 'glass', position: { x: 0, y: 330 },  data: { label: 'Form Fill',     icon: Mail,          colorRgb: '167,139,250', stat: '94 triggers',  hideLeft: true } },
  { id: 'ai-brain',  type: 'glass', position: { x: 240, y: 135 }, data: { label: 'Aria AI',       icon: Brain,         type: 'center' } },
  { id: 'action-1',  type: 'glass', position: { x: 480, y: 0 },   data: { label: 'Text-Back',     icon: MessageSquare, colorRgb: '74,222,128',  stat: '8s avg',       hideRight: true } },
  { id: 'action-2',  type: 'glass', position: { x: 480, y: 100 }, data: { label: 'Email Follow-Up', icon: Mail,        colorRgb: '167,139,250', stat: '60s send',     hideRight: true } },
  { id: 'action-3',  type: 'glass', position: { x: 480, y: 200 }, data: { label: 'Appointment',   icon: Calendar,      colorRgb: '59,130,246',  stat: 'AI booked',    hideRight: true } },
  { id: 'action-4',  type: 'glass', position: { x: 480, y: 300 }, data: { label: 'Review Request', icon: Star,          colorRgb: '245,158,11',  stat: '2h post-visit', hideRight: true } },
  { id: 'action-5',  type: 'glass', position: { x: 480, y: 400 }, data: { label: 'Re-Engagement', icon: Zap,           colorRgb: '139,92,246',  stat: '24h sequence', hideRight: true } },
]

const triggerEdgeStyle = { stroke: 'rgba(59,130,246,0.4)', strokeWidth: 1.5 }
const actionEdgeStyle  = { stroke: 'rgba(59,130,246,0.35)', strokeWidth: 1.5 }
const edgeMarker = { type: MarkerType.ArrowClosed, width: 14, height: 14, color: 'rgba(59,130,246,0.5)' }

const initialEdges = [
  { id: 'e1', source: 'trigger-1', target: 'ai-brain', type: 'smoothstep', animated: true, style: triggerEdgeStyle, markerEnd: edgeMarker },
  { id: 'e2', source: 'trigger-2', target: 'ai-brain', type: 'smoothstep', animated: true, style: triggerEdgeStyle, markerEnd: edgeMarker },
  { id: 'e3', source: 'trigger-3', target: 'ai-brain', type: 'smoothstep', animated: true, style: triggerEdgeStyle, markerEnd: edgeMarker },
  { id: 'e4', source: 'trigger-4', target: 'ai-brain', type: 'smoothstep', animated: true, style: triggerEdgeStyle, markerEnd: edgeMarker },
  { id: 'e5', source: 'ai-brain', target: 'action-1', type: 'smoothstep', animated: true, style: actionEdgeStyle, markerEnd: edgeMarker },
  { id: 'e6', source: 'ai-brain', target: 'action-2', type: 'smoothstep', animated: true, style: actionEdgeStyle, markerEnd: edgeMarker },
  { id: 'e7', source: 'ai-brain', target: 'action-3', type: 'smoothstep', animated: true, style: actionEdgeStyle, markerEnd: edgeMarker },
  { id: 'e8', source: 'ai-brain', target: 'action-4', type: 'smoothstep', animated: true, style: actionEdgeStyle, markerEnd: edgeMarker },
  { id: 'e9', source: 'ai-brain', target: 'action-5', type: 'smoothstep', animated: true, style: actionEdgeStyle, markerEnd: edgeMarker },
]

const miniMapNodeColor = (node) => {
  if (node.data?.type === 'center') return '#3b82f6'
  if (node.id.startsWith('trigger')) return '#f59e0b'
  return '#10b981'
}

export default function AutomationFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-white/[0.06]">
      {/* Ambient glow behind center */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse 40% 50% at 50% 45%, rgba(59,130,246,0.06) 0%, transparent 70%)',
      }} />

      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView fitViewOptions={{ padding: 0.35 }}
        zoomOnDoubleClick={false}
        zoomOnScroll={true}
        zoomOnPinch={true}
        panOnDrag={true}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={false}
        minZoom={0.5}
        maxZoom={2}
        colorMode="dark"
        style={{ background: 'transparent' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} color="rgba(255,255,255,0.04)" gap={24} size={1.5} />
        <Controls
          showInteractive={false}
          position="bottom-right"
        />
        <MiniMap
          position="top-right"
          nodeColor={miniMapNodeColor}
          bgColor="#09090b"
          maskColor="rgba(0,0,0,0.6)"
          nodeBorderRadius={4}
          zoomable
          pannable
          style={{ width: 140, height: 90 }}
        />
      </ReactFlow>
    </div>
  )
}
