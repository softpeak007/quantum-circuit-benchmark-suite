from qiskit import transpile, __version__ as qiskit_version

class MetricsEngine:
    @staticmethod
    def get_metrics(qc, optimization_level=1):
        native_qc = transpile(qc, basis_gates=["cx", "rz", "sx", "x"], optimization_level=optimization_level)
        native_ops = native_qc.count_ops()

        ct_qc = transpile(qc, basis_gates=["cx", "h", "t", "tdg", "s", "sdg", "x"], optimization_level=optimization_level)
        ct_ops = ct_qc.count_ops()

        return {
            "qiskit_version": qiskit_version,
            "native": {
                "depth": native_qc.depth(),
                "cx": native_ops.get("cx", 0),
                "rz": native_ops.get("rz", 0)
            },
            "clifford_t": {
                "depth": ct_qc.depth(),
                "cx": ct_ops.get("cx", 0),
                "t": ct_ops.get("t", 0),
                "tdg": ct_ops.get("tdg", 0)
            },
            "total_non_clifford": ct_ops.get("t", 0) + ct_ops.get("tdg", 0)
        }
