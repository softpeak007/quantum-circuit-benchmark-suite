from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT, CDKMRippleCarryAdder, DraperQFTAdder

class BenchmarkLibrary:
    @staticmethod
    def construct(name, n):
        if name == "bell":
            qc = QuantumCircuit(2)
            qc.h(0)
            qc.cx(0, 1)

        elif name == "ghz":
            qc = QuantumCircuit(n)
            qc.h(0)
            for i in range(n - 1):
                qc.cx(i, i + 1)

        elif name == "qft":
            qc = QFT(n).decompose()

        elif name == "ripple":
            qc = CDKMRippleCarryAdder(n // 2)

        elif name == "draper":
            qc = DraperQFTAdder(n // 2)

        else:
            raise ValueError(f"Circuit {name} not found.")

        qc.name = name
        return qc
