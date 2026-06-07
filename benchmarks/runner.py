import time
from benchmarks.loader import BenchmarkLibrary
from core.metrics import MetricsEngine
from experiments.registry import ExperimentRegistry

class BenchmarkRunner:
    def __init__(self):
        self.registry = ExperimentRegistry()

    def run_suite(self, small=False):
        circuits = ["bell", "ghz", "qft", "draper", "ripple"]
        opt_levels = [0, 1, 2, 3]

        for name in circuits:
            qubits_range = [2] if name == "bell" else [2, 4, 6, 8]

            for n in qubits_range:
                for opt in opt_levels:
                    try:
                        start = time.time()
                        qc = BenchmarkLibrary.construct(name, n)
                        metrics = MetricsEngine.get_metrics(qc, optimization_level=opt)
                        metrics["transpilation_time"] = time.time() - start
                        self.registry.log(name, n, opt, metrics)
                        print(f"[SUCCESS] {name} n={n} opt={opt}")
                    except Exception as e:
                        self.registry.log_failure(name, n, opt, e)
                        print(f"[FAIL] {name} n={n} opt={opt}: {e}")
