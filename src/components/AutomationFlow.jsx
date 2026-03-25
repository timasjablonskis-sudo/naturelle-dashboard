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
import { Phone, MessageSquare, Calendar, Star, Zap, Clock, Shield, PhoneMissed, RotateCcw } from 'lucide-react'

function GlassNode({ data }) {
  const Icon = data.icon
  const isCenter = data.type === 'center'
  const [hovered, setHovered] = useState(false)

  const centerColor = data.centerColor || '5,150,105'
  const accentColor = isCenter ? centerColor : (data.colorRgb || '255,255,255')

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: isCenter
          ? `rgba(${centerColor},0.08)`
          : hovered
            ? `rgba(${accentColor},0.06)`
            : 'rgba(255,255,255,0.03)',
        border: isCenter
          ? `1px solid rgba(${centerColor},0.4)`
          : `1px solid rgba(${accentColor},${hovered ? '0.3' : '0.15'})`,
        borderRadius: 16,
        padding: isCenter ? '16px 24px' : '12px 18px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isCenter
          ? `0 0 32px rgba(${centerColor},0.2), 0 4px 24px rgba(0,0,0,0.4)`
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
          border: `2px solid rgba(${centerColor},0.3)`,
          animation: 'pulse-ring 2s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}

      <Handle type="target" position={Position.Left}
        style={{ background: `rgb(${accentColor})`, border: '2px solid #09090b', width: 8, height: 8, opacity: data.hideLeft ? 0 : 1 }} />

      <div style={{
        width: 36, height: 36, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isCenter ? `rgba(${centerColor},0.18)` : `rgba(${accentColor},0.12)`,
        transition: 'background 0.2s ease',
      }}>
        <Icon size={18} style={{
          color: `rgb(${accentColor})`,
          filter: isCenter ? `drop-shadow(0 0 6px rgba(${centerColor},0.8))` : 'none',
        }} />
      </div>

      <span style={{
        color: isCenter ? `rgb(${centerColor})` : 'rgba(255,255,255,0.9)',
        fontSize: isCenter ? 13 : 12,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        fontWeight: isCenter ? 600 : 500,
        letterSpacing: '-0.01em', lineHeight: 1.3,
        whiteSpace: 'pre-line',
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
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.03em',
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

// ─── Color constants ─────────────────────────────────────
const BLUE   = '59,130,246'
const VIOLET = '139,92,246'
const EMERALD = '5,150,105'
const AMBER  = '245,158,11'

const initialNodes = [
  // ──── INPUT CHANNELS (Left) ────
  { id: 'text-channels', type: 'glass', position: { x: 0, y: 60 },
    data: { label: 'Text Channels', icon: MessageSquare, colorRgb: BLUE, stat: 'IG · FB · Chat · Email · SMS', hideLeft: true } },
  { id: 'phone-channel', type: 'glass', position: { x: 0, y: 200 },
    data: { label: 'Phone', icon: Phone, colorRgb: VIOLET, stat: 'Inbound & Outbound', hideLeft: true } },

  // ──── CORE ENGINES (Center) ────
  { id: 'omni-core', type: 'glass', position: { x: 240, y: 45 },
    data: { label: 'Omni-Channel\nConcierge', icon: MessageSquare, type: 'center', centerColor: BLUE, stat: '748 triggers' } },
  { id: 'voice-core', type: 'glass', position: { x: 240, y: 200 },
    data: { label: 'Omni Voice\nReceptionist', icon: Phone, type: 'center', centerColor: VIOLET, stat: '132 triggers' } },

  // ──── ADD-ON MODULES (Right) ────
  { id: 'reengagement',    type: 'glass', position: { x: 500, y: 0 },
    data: { label: 'Lead Re-engage', icon: Zap, colorRgb: EMERALD, stat: '84 triggers', hideRight: true } },
  { id: 'noshow',          type: 'glass', position: { x: 500, y: 80 },
    data: { label: 'No-Show Recovery', icon: PhoneMissed, colorRgb: EMERALD, stat: '47 triggers', hideRight: true } },
  { id: 'reminders',       type: 'glass', position: { x: 500, y: 160 },
    data: { label: 'Smart Reminders', icon: Calendar, colorRgb: EMERALD, stat: '203 triggers', hideRight: true } },
  { id: 'reactivation',    type: 'glass', position: { x: 500, y: 240 },
    data: { label: 'DB Reactivation', icon: RotateCcw, colorRgb: EMERALD, stat: '12 sent', hideRight: true } },
  { id: 'treatment-cycle', type: 'glass', position: { x: 500, y: 320 },
    data: { label: 'Treatment Cycle', icon: Clock, colorRgb: EMERALD, stat: '94 recalls', hideRight: true } },
  { id: 'review-gen',      type: 'glass', position: { x: 500, y: 400 },
    data: { label: 'Review Gen', icon: Star, colorRgb: EMERALD, stat: '156 reviews', hideRight: true } },

  // ──── STANDALONE (Bottom Center) ────
  { id: 'reputation', type: 'glass', position: { x: 240, y: 400 },
    data: { label: 'Reputation\nResponse Engine', icon: Shield, colorRgb: AMBER, stat: '156 reviews', hideRight: true, hideLeft: true } },
]

// ─── Edge styles ─────────────────────────────────────────
const blueEdge   = { stroke: 'rgba(59,130,246,0.4)', strokeWidth: 1.5 }
const violetEdge = { stroke: 'rgba(139,92,246,0.4)', strokeWidth: 1.5 }
const greenEdge  = { stroke: 'rgba(5,150,105,0.35)', strokeWidth: 1.5 }
const blueMarker   = { type: MarkerType.ArrowClosed, width: 14, height: 14, color: 'rgba(59,130,246,0.5)' }
const violetMarker = { type: MarkerType.ArrowClosed, width: 14, height: 14, color: 'rgba(139,92,246,0.5)' }
const greenMarker  = { type: MarkerType.ArrowClosed, width: 14, height: 14, color: 'rgba(5,150,105,0.5)' }

const initialEdges = [
  // Input → Cores
  { id: 'e-text-omni',   source: 'text-channels', target: 'omni-core',  type: 'smoothstep', animated: true, style: blueEdge,   markerEnd: blueMarker },
  { id: 'e-phone-voice', source: 'phone-channel',  target: 'voice-core', type: 'smoothstep', animated: true, style: violetEdge, markerEnd: violetMarker },

  // Omni-Core → All Add-ons
  { id: 'e-omni-reeng',  source: 'omni-core', target: 'reengagement',    type: 'smoothstep', animated: true, style: greenEdge, markerEnd: greenMarker },
  { id: 'e-omni-noshow', source: 'omni-core', target: 'noshow',          type: 'smoothstep', animated: true, style: greenEdge, markerEnd: greenMarker },
  { id: 'e-omni-remind', source: 'omni-core', target: 'reminders',       type: 'smoothstep', animated: true, style: greenEdge, markerEnd: greenMarker },
  { id: 'e-omni-react',  source: 'omni-core', target: 'reactivation',    type: 'smoothstep', animated: true, style: greenEdge, markerEnd: greenMarker },
  { id: 'e-omni-cycle',  source: 'omni-core', target: 'treatment-cycle', type: 'smoothstep', animated: true, style: greenEdge, markerEnd: greenMarker },
  { id: 'e-omni-review', source: 'omni-core', target: 'review-gen',      type: 'smoothstep', animated: true, style: greenEdge, markerEnd: greenMarker },

  // Voice-Core → Shared Add-ons
  { id: 'e-voice-noshow',  source: 'voice-core', target: 'noshow',       type: 'smoothstep', animated: true, style: violetEdge, markerEnd: violetMarker },
  { id: 'e-voice-remind',  source: 'voice-core', target: 'reminders',    type: 'smoothstep', animated: true, style: violetEdge, markerEnd: violetMarker },
  { id: 'e-voice-react',   source: 'voice-core', target: 'reactivation', type: 'smoothstep', animated: true, style: violetEdge, markerEnd: violetMarker },
]

const miniMapNodeColor = (node) => {
  if (node.data?.centerColor === BLUE)   return '#3b82f6'
  if (node.data?.centerColor === VIOLET) return '#8b5cf6'
  if (node.data?.colorRgb === BLUE)      return '#3b82f6'
  if (node.data?.colorRgb === VIOLET)    return '#8b5cf6'
  if (node.data?.colorRgb === AMBER)     return '#f59e0b'
  return '#10b981'
}

export default function AutomationFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="relative w-full h-[700px] rounded-2xl overflow-hidden border border-white/[0.06]">
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse 40% 50% at 50% 45%, rgba(5,150,105,0.06) 0%, transparent 70%)',
      }} />

      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView fitViewOptions={{ padding: 0.3 }}
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
