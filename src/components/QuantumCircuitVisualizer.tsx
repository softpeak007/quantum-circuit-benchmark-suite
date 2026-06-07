import { motion } from "motion/react";

interface VisualizerProps {
  circuitName: string;
  qubits: number;
}

export default function QuantumCircuitVisualizer({ circuitName, qubits }: VisualizerProps) {
  // Render up to 5 qubits visibly. If N > 5, show a truncated system with a fade gradient.
  const displayQubits = Math.min(qubits, 5);
  const truncated = qubits > 5;
  
  const wireHeight = 48;
  const paddingY = 24;
  const paddingX = 48;
  const startX = 64;
  const gapX = 56;
  const totalHeight = paddingY * 2 + displayQubits * wireHeight;

  // Let's build distinct gate sequences based on the circuit selected
  const renderGates = () => {
    const elements = [];

    if (circuitName === "Bell") {
      // Step 0: Hadamard gate on qubit 0
      elements.push(
        <g key="bell-h0" className="group">
          <title>Hadamard Gate (Creates equal superposition: |0⟩ + |1⟩) / √2</title>
          <rect
            x={startX}
            y={paddingY + 0 * wireHeight - 14}
            width="28"
            height="28"
            rx="4"
            className="fill-cyan-500 stroke-cyan-300 stroke-2 cursor-pointer transition-all duration-300 hover:fill-cyan-400 shadow-md"
          />
          <text
            x={startX + 14}
            y={paddingY + 0 * wireHeight + 5}
            textAnchor="middle"
            className="fill-slate-950 font-sans text-xs font-semibold"
          >
            H
          </text>
        </g>
      );

      // Step 1: CX gate from 0 (control) to 1 (target)
      const cxX = startX + gapX;
      elements.push(
        <g key="bell-cx" className="group">
          <title>Controlled-Not (CX) Gate: Entangles Qubit 0 and 1</title>
          {/* Vertical Coupling line */}
          <line
            x1={cxX}
            y1={paddingY + 0 * wireHeight}
            x2={cxX}
            y2={paddingY + 1 * wireHeight}
            className="stroke-cyan-400 stroke-2"
          />
          {/* Control point */}
          <circle
            cx={cxX}
            cy={paddingY + 0 * wireHeight}
            r="5"
            className="fill-cyan-400"
          />
          {/* Target XOR circle */}
          <circle
            cx={cxX}
            cy={paddingY + 1 * wireHeight}
            r="10"
            className="fill-slate-900 stroke-cyan-400 stroke-2"
          />
          <line
            x1={cxX - 10}
            y1={paddingY + 1 * wireHeight}
            x2={cxX + 10}
            y2={paddingY + 1 * wireHeight}
            className="stroke-cyan-400 stroke-2"
          />
          <line
            x1={cxX}
            y1={paddingY + 1 * wireHeight - 10}
            x2={cxX}
            y2={paddingY + 1 * wireHeight + 10}
            className="stroke-cyan-400 stroke-2"
          />
        </g>
      );

      // Optional additional lines for qubits that are idle or duplicate
      for (let q = 2; q < displayQubits; q++) {
        const idX = startX + (q % 2 === 0 ? gapX : gapX * 1.5);
        elements.push(
          <g key={`bell-id-${q}`} className="group">
            <title>Identity Gate / Idle Qubit Wire</title>
            <rect
              x={idX}
              y={paddingY + q * wireHeight - 14}
              width="28"
              height="28"
              rx="4"
              className="fill-slate-800 stroke-slate-600 stroke-2 cursor-pointer"
            />
            <text
              x={idX + 14}
              y={paddingY + q * wireHeight + 5}
              textAnchor="middle"
              className="fill-slate-400 font-sans text-xs font-medium"
            >
              I
            </text>
          </g>
        );
      }
    } 
    else if (circuitName === "GHZ") {
      // Step 0: Hadamard on qubit 0
      elements.push(
        <g key="ghz-h0">
          <title>Hadamard Gate (Superposition)</title>
          <rect
            x={startX}
            y={paddingY + 0 * wireHeight - 14}
            width="28"
            height="28"
            rx="4"
            className="fill-cyan-500 stroke-cyan-300 stroke-2 shadow"
          />
          <text
            x={startX + 14}
            y={paddingY + 0 * wireHeight + 5}
            textAnchor="middle"
            className="fill-slate-950 font-sans text-xs font-semibold"
          >
            H
          </text>
        </g>
      );

      // Step 1..N-1: Entangling cascade of CX gates
      for (let q = 1; q < displayQubits; q++) {
        const cxX = startX + q * gapX;
        elements.push(
          <g key={`ghz-cx-${q}`}>
            <title>{`Controlled-NOT: Entangles q[${q-1}] with q[${q}]`}</title>
            <line
              x1={cxX}
              y1={paddingY + (q - 1) * wireHeight}
              x2={cxX}
              y2={paddingY + q * wireHeight}
              className="stroke-cyan-400 stroke-2"
            />
            <circle
              cx={cxX}
              cy={paddingY + (q - 1) * wireHeight}
              r="5"
              className="fill-cyan-400"
            />
            <circle
              cx={cxX}
              cy={paddingY + q * wireHeight}
              r="10"
              className="fill-slate-900 stroke-cyan-400 stroke-2"
            />
            <line
              x1={cxX - 10}
              y1={paddingY + q * wireHeight}
              x2={cxX + 10}
              y2={paddingY + q * wireHeight}
              className="stroke-cyan-400 stroke-2"
            />
            <line
              x1={cxX}
              y1={paddingY + q * wireHeight - 10}
              x2={cxX}
              y2={paddingY + q * wireHeight + 10}
              className="stroke-cyan-400 stroke-2"
            />
          </g>
        );
      }
    } 
    else if (circuitName === "QFT") {
      // Quantum Fourier Transform: cascading H gates and Controlled-Rotations
      for (let activeQ = 0; activeQ < displayQubits; activeQ++) {
        const offset = activeQ * (gapX * 1.5);
        
        // Hadamard
        elements.push(
          <g key={`qft-h-${activeQ}`}>
            <title>Hadamard Gate to set quantum amplitude superposition</title>
            <rect
              x={startX + offset}
              y={paddingY + activeQ * wireHeight - 14}
              width="28"
              height="28"
              rx="4"
              className="fill-cyan-500 stroke-cyan-300 stroke-2"
            />
            <text
              x={startX + offset + 14}
              y={paddingY + activeQ * wireHeight + 5}
              textAnchor="middle"
              className="fill-slate-950 font-sans text-xs font-semibold"
            >
              H
            </text>
          </g>
        );

        // Controlled rotations downward
        for (let targetQ = activeQ + 1; targetQ < displayQubits; targetQ++) {
          const rotX = startX + offset + (targetQ - activeQ) * (gapX * 0.75);
          const divisor = Math.pow(2, targetQ - activeQ + 1);
          
          elements.push(
            <g key={`qft-cp-${activeQ}-${targetQ}`}>
              <title>{`Controlled Phase Rotation: R_k (Phase factor = 2π / ${divisor})`}</title>
              <line
                x1={rotX}
                y1={paddingY + activeQ * wireHeight}
                x2={rotX}
                y2={paddingY + targetQ * wireHeight}
                className="stroke-purple-400 stroke-1.5 stroke-dasharray"
                strokeDasharray="2,2"
              />
              <circle
                cx={rotX}
                cy={paddingY + activeQ * wireHeight}
                r="4"
                className="fill-purple-400"
              />
              <rect
                x={rotX - 10}
                y={paddingY + targetQ * wireHeight - 10}
                width="20"
                height="20"
                rx="3"
                className="fill-purple-600 stroke-purple-400 stroke-1 cursor-pointer"
              />
              <text
                x={rotX}
                y={paddingY + targetQ * wireHeight + 4}
                textAnchor="middle"
                className="fill-white font-mono text-[8px] font-bold"
              >
                {`R${targetQ - activeQ + 1}`}
              </text>
            </g>
          );
        }
      }
    } 
    else if (circuitName === "Draper QFT Adder") {
      // QFT Adder is extremely rich, combining QFT state preparation and Rotational cascade
      // Step 1: Pre-rotation blocks representing QFT-inputs
      for (let q = 0; q < displayQubits; q++) {
        if (q % 2 === 0) {
          const offset = startX + q * 10;
          elements.push(
            <g key={`draper-h-${q}`}>
              <title>Hadamard Gate (Fourier Transform entry)</title>
              <rect
                x={offset}
                y={paddingY + q * wireHeight - 14}
                width="24"
                height="24"
                rx="4"
                className="fill-cyan-500 stroke-cyan-300 stroke-1.5"
              />
              <text
                x={offset + 12}
                y={paddingY + q * wireHeight + 2}
                textAnchor="middle"
                className="fill-slate-950 font-sans text-[10px] font-bold"
              >
                H
              </text>
            </g>
          );
        } else {
          // Input state setup
          const offset = startX + q * 10;
          elements.push(
            <g key={`draper-init-${q}`}>
              <title>State initialization angle preparation</title>
              <rect
                x={offset}
                y={paddingY + q * wireHeight - 14}
                width="24"
                height="24"
                rx="4"
                className="fill-purple-500 stroke-purple-300 stroke-1.5"
              />
              <text
                x={offset + 12}
                y={paddingY + q * wireHeight + 2}
                textAnchor="middle"
                className="fill-white font-sans text-[9px]"
              >
                Rz
              </text>
            </g>
          );
        }
      }

      // Step 2: Addition coupling lines: CP / Phase Adders
      for (let i = 0; i < Math.floor(displayQubits / 2); i++) {
        const addX = startX + gapX * 1.8 + i * gapX * 1.5;
        const src = i;
        const dst = i + Math.floor(displayQubits / 2);
        
        elements.push(
          <g key={`draper-add-couple-${i}`}>
            <title>Modular phase addition: Entangle register lines</title>
            <line
              x1={addX}
              y1={paddingY + src * wireHeight}
              x2={addX}
              y2={paddingY + dst * wireHeight}
              className="stroke-purple-400 stroke-2"
            />
            <circle cx={addX} cy={paddingY + src * wireHeight} r="5" className="fill-purple-400" />
            <rect
              x={addX - 12}
              y={paddingY + dst * wireHeight - 12}
              width="24"
              height="24"
              rx="4"
              className="fill-purple-700 stroke-purple-400"
            />
            <text
              x={addX}
              y={paddingY + dst * wireHeight + 4}
              textAnchor="middle"
              className="fill-white font-mono text-[9px]"
            >
              U+
            </text>
          </g>
        );
      }
    } 
    else {
      // Ripple Carry Adder: Toffoli-heavy logic boxes
      // We render sequence of XOR (CX) and Toffoli (CCX) boxes
      const adderBlocks = Math.max(1, Math.floor(displayQubits / 2));
      
      for (let b = 0; b < adderBlocks; b++) {
        const blockX = startX + b * gapX * 1.6;
        const q0 = b * 2;
        const q1 = b * 2 + 1;
        const q2 = Math.min(b * 2 + 2, displayQubits - 1);

        if (q0 < displayQubits && q1 < displayQubits) {
          // CX gate
          elements.push(
            <g key={`rc-cx-${b}`}>
              <title>Temporary Carry Propagate (CX gate)</title>
              <line
                x1={blockX}
                y1={paddingY + q0 * wireHeight}
                x2={blockX}
                y2={paddingY + q1 * wireHeight}
                className="stroke-cyan-500 stroke-1.5"
              />
              <circle cx={blockX} cy={paddingY + q0 * wireHeight} r="4" className="fill-cyan-400" />
              <circle cx={blockX} cy={paddingY + q1 * wireHeight} r="8" className="fill-slate-900 stroke-cyan-400 stroke-1.5" />
            </g>
          );
        }

        if (q0 < displayQubits && q1 < displayQubits && q2 < displayQubits && q1 !== q2) {
          // Toffoli (CCX) gate
          const ccxX = blockX + gapX * 0.75;
          elements.push(
            <g key={`rc-ccx-${b}`}>
              <title>Toffoli (CCX) Gate: Reversible carry-generate operations (Decomposes to 7 expensive T-gates)</title>
              <line
                x1={ccxX}
                y1={paddingY + q0 * wireHeight}
                x2={ccxX}
                y2={paddingY + q2 * wireHeight}
                className="stroke-amber-400 stroke-1.5"
              />
              <circle cx={ccxX} cy={paddingY + q0 * wireHeight} r="4" className="fill-amber-400" />
              <circle cx={ccxX} cy={paddingY + q1 * wireHeight} r="4" className="fill-amber-400" />
              <circle cx={ccxX} cy={paddingY + q2 * wireHeight} r="8" className="fill-slate-900 stroke-amber-400 stroke-1.5" />
              <text x={ccxX} y={paddingY + q2 * wireHeight + 3} textAnchor="middle" className="fill-amber-400 text-[9px] font-bold">T</text>
            </g>
          );
        }
      }
    }

    return elements;
  };

  return (
    <div className="relative overflow-x-auto bg-slate-950 p-6 border border-slate-800 rounded-xl shadow-2xl">
      <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        Interactive Register Grid
      </div>
      
      <svg
        width="100%"
        height={totalHeight}
        viewBox={`0 0 600 ${totalHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="min-w-[500px]"
      >
        {/* Render timeline wires */}
        {Array.from({ length: displayQubits }).map((_, q) => {
          const wireY = paddingY + q * wireHeight;
          return (
            <g key={`wire-row-${q}`}>
              {/* Wire line */}
              <line
                x1="20"
                y1={wireY}
                x2="560"
                y2={wireY}
                className="stroke-slate-800 stroke-2"
              />
              {/* Qubit label */}
              <text
                x="14"
                y={wireY + 4}
                className="fill-slate-400 font-mono text-xs font-semibold"
                textAnchor="end"
              >
                q[{q}]
              </text>
              {/* End state line */}
              <line
                x1="560"
                y1={wireY - 8}
                x2="560"
                y2={wireY + 8}
                className="stroke-slate-700 stroke"
              />
              <line
                x1="563"
                y1={wireY - 8}
                x2="563"
                y2={wireY + 8}
                className="stroke-slate-700 stroke"
              />
            </g>
          );
        })}

        {/* Dynamic Interactive Render Gates */}
        {renderGates()}

        {/* Truncated Gradient Shade if Qubits > 5 */}
        {truncated && (
          <g>
            <rect
              x="20"
              y={totalHeight - paddingY - 10}
              width="540"
              height="20"
              className="fill-slate-950 opacity-40"
            />
            <text
              x="290"
              y={totalHeight - 8}
              textAnchor="middle"
              className="fill-slate-500 font-mono text-[10px] italic"
            >
              {`+ ${qubits - 5} remaining overlapping qubit registers transpiled outside timeline view`}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
