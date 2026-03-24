import React, { useState } from 'react'
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
import { PhoneMissed, Phone, MessageSquare, Mail, Calendar, Star, Zap, Brain, Clock } from 'lucide-react'

function GlassNode({ data }) {
  const Icon = data.icon
  const isCenter = data.type === 'center'
  const [hovered, setHovered] = useState(false)

  const accentColor = isCenter ? '5,150,105' : (data.colorRgb || '255,255,255')

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: isCenter
          ? 'rgba(5,150,105,0.08)'
          : hovered
            ? `rgba(${accentColor},0.06)`
            : 'rgba(255,255,255,0.03)',
        border: isCenter
          ? '1px solid rgba(5,150,105,0.4)'
          : `1px solid rgba(${accentColor},${hovered ? '0.3' : '0.15'})`,
        borderRadius: 16,
        padding: isCenter ? '16px 24px' : '12px 18px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isCenter
          ? '0 0 32px rgba(5,150,105,0.2), 0 4px 24px rgba(0,0,0,0.4)'
          : hovered
            ? `0 0 20px rgba(${accentColor},0.15), 0 4px 20px rgba(0,0,0,0.3)`
            : '0 4px 16px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        minWidth: isCenter ? 160 : 140,
        cursor: 'grab', userSelect: 'none',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease',
      }}
    >
      {isCenter && (
        <div style={{
          position: 'absolute', inset: -6,
          borderRadius: 22,
          border: '2px solid rgba(5,150,105,0.3)',
          animation: 'pulse-ring 2s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}

      <Handle type="target" position={Position.Left}
        style={{ background: `rgb(${accentColor})`, border: '2px solid #09090b', width: 8, height: 8, opacity: data.hideLeft ? 0 : 1 }} />

      <div style={{
        width: 36, height: 36, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isCenter ? 'rgba(5,150,105,0.18)' : `rgba(${accentColor},0.12)`,
        transition: 'background 0.2s ease',
      }}>
        <Icon size={18} style={{
          color: `rgb(${accentColor})`,
          filter: isCenter ? 'drop-shadow(0 0 6px rgba(5,150,105,0.8))' : 'none',
        }} />
      </div>

      <span style={{
        color: isCenter ? '#059669' : 'rgba(255,255,255,0.9)',
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
          {data.stat !== 'Coming Soon' && (
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 4px rgba(16,185,129,0.6)',
              animation: 'simPulse 2s ease-in-out infinite',
            }} />
          )}
          <span style={{
            fontSize: 10, fontFamily: 'Space Mono, monospace',
            color: data.stat === 'Coming Soon' ? `rgb(${accentColor})` : 'rgba(255,255,255,0.4)',
            letterSpacing: '0.03em',
            fontWeight: data.stat === 'Coming Soon' ? 700 : 400,
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

// Inbound Capture (left) — amber
const AMBER = '245,158,11'
// Lead Nurture (right top) — blue
const BLUE = '59,130,246'
// Revenue Engine (right bottom) — emerald
const EMERALD = '5,150,105'

const initialNodes = [
  // ──── INBOUND CAPTURE (Left) ────
  { id: 'voice',       type: 'glass', position: { x: 0, y: 0 },   data: { label: 'AI Voice',       icon: Phone,         colorRgb: AMBER,   stat: 'Coming Soon', hideLeft: true } },
  { id: 'omni-chat',   type: 'glass', position: { x: 0, y: 110 }, data: { label: 'Omni-Chat AI',   icon: MessageSquare, colorRgb: AMBER,   stat: '501 triggers', hideLeft: true } },
  { id: 'missed-call', type: 'glass', position: { x: 0, y: 220 }, data: { label: 'Missed Call TB',  icon: PhoneMissed,   colorRgb: AMBER,   stat: '247 triggers', hideLeft: true } },

  // ──── AI BRAIN (Center) ────
  { id: 'ai-brain',    type: 'glass', position: { x: 240, y: 135 }, data: { label: 'AI Front Desk', icon: Brain, type: 'center' } },

  // ──── LEAD NURTURE (Right Top) ────
  { id: 'handshake',   type: 'glass', position: { x: 480, y: 0 },   data: { label: 'Lead Handshake', icon: Mail,     colorRgb: BLUE,    stat: '60s send',     hideRight: true } },
  { id: 'reminders',   type: 'glass', position: { x: 480, y: 110 }, data: { label: 'Smart Reminders', icon: Calendar, colorRgb: BLUE,    stat: '203 triggers', hideRight: true } },

  // ──── REVENUE ENGINE (Right Bottom) ────
  { id: 'botox-clock', type: 'glass', position: { x: 480, y: 230 }, data: { label: 'Botox Clock',    icon: Clock, colorRgb: EMERALD, stat: '94 recalls',   hideRight: true } },
  { id: 'reactivation', type: 'glass', position: { x: 480, y: 330 }, data: { label: 'DB Reactivation', icon: Zap,   colorRgb: EMERALD, stat: '12 sent',      hideRight: true } },
  { id: 'reputation',  type: 'glass', position: { x: 480, y: 430 }, data: { label: 'Reputation',     icon: Star,  colorRgb: EMERALD, stat: '156 reviews',  hideRight: true } },
]

const amberEdge  = { stroke: 'rgba(245,158,11,0.4)', strokeWidth: 1.5 }
const blueEdge   = { stroke: 'rgba(59,130,246,0.35)', strokeWidth: 1.5 }
const greenEdge  = { stroke: 'rgba(5,150,105,0.35)', strokeWidth: 1.5 }
const edgeMarker = { type: MarkerType.ArrowClosed, width: 14, height: 14, color: 'rgba(5,150,105,0.5)' }

const initialEdges = [
  // Inbound → Brain (amber)
  { id: 'e1', source: 'voice',       target: 'ai-brain', type: 'smoothstep', animated: true, style: amberEdge, markerEnd: edgeMarker },
  { id: 'e2', source: 'omni-chat',   target: 'ai-brain', type: 'smoothstep', animated: true, style: amberEdge, markerEnd: edgeMarker },
  { id: 'e3', source: 'missed-call', target: 'ai-brain', type: 'smoothstep', animated: true, style: amberEdge, markerEnd: edgeMarker },

  // Brain → Nurture (blue)
  { id: 'e4', source: 'ai-brain', target: 'handshake', type: 'smoothstep', animated: true, style: blueEdge, markerEnd: edgeMarker },
  { id: 'e5', source: 'ai-brain', target: 'reminders', type: 'smoothstep', animated: true, style: blueEdge, markerEnd: edgeMarker },

  // Brain → Revenue (emerald)
  { id: 'e6', source: 'ai-brain', target: 'botox-clock',  type: 'smoothstep', animated: true, style: greenEdge, markerEnd: edgeMarker },
  { id: 'e7', source: 'ai-brain', target: 'reactivation', type: 'smoothstep', animated: true, style: greenEdge, markerEnd: edgeMarker },
  { id: 'e8', source: 'ai-brain', target: 'reputation',   type: 'smoothstep', animated: true, style: greenEdge, markerEnd: edgeMarker },
]

const miniMapNodeColor = (node) => {
  if (node.data?.type === 'center') return '#059669'
  if (node.data?.colorRgb === AMBER) return '#f59e0b'
  if (node.data?.colorRgb === BLUE) return '#3b82f6'
  return '#10b981'
}

export default function AutomationFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-white/[0.06]">
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse 40% 50% at 50% 45%, rgba(5,150,105,0.06) 0%, transparent 70%)',
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
        <Controls showInteractive={false} position="bottom-right" />
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
