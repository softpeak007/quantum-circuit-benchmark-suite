import csv, os, json, hashlib, platform, sys
from datetime import datetime

class ExperimentRegistry:
    def __init__(self):
        os.makedirs("results/runs", exist_ok=True)
        self.log_file = "results/experiment_log.csv"
        self.fail_file = "results/failures.csv"

        if not os.path.exists(self.log_file):
            with open(self.log_file, "w", newline="") as f:
                csv.writer(f).writerow([
                    "run_id","timestamp","circuit_name","qubits","optimization_level",
                    "qiskit_version","native_depth","native_cx","native_rz",
                    "clifford_t_depth","clifford_t_cx","clifford_t_t",
                    "clifford_t_tdg","total_non_clifford","hash"
                ])

        if not os.path.exists(self.fail_file):
            with open(self.fail_file, "w", newline="") as f:
                csv.writer(f).writerow(["timestamp","circuit_name","qubits","optimization_level","error"])

    def log(self, circuit_name, qubits, opt_level, metrics):
        timestamp = datetime.now().isoformat()
        raw = f"{timestamp}{circuit_name}{qubits}{opt_level}{metrics}"
        run_id = hashlib.md5(raw.encode()).hexdigest()[:8]
        sha_hash = hashlib.sha256(raw.encode()).hexdigest()

        full_data = {
            "run_id": run_id,
            "timestamp": timestamp,
            "metadata": {
                "platform": "Google Colab",
                "python_version": sys.version.split()[0],
                "os": platform.platform(),
                "experiment_version": "v1.0"
            },
            "circuit_name": circuit_name,
            "qubits": qubits,
            "optimization_level": opt_level,
            "metrics": metrics,
            "hash": sha_hash
        }

        with open(f"results/runs/{run_id}.json", "w") as f:
            json.dump(full_data, f, indent=4)

        with open(self.log_file, "a", newline="") as f:
            csv.writer(f).writerow([
                run_id, timestamp, circuit_name, qubits, opt_level,
                metrics["qiskit_version"],
                metrics["native"]["depth"], metrics["native"]["cx"], metrics["native"]["rz"],
                metrics["clifford_t"]["depth"], metrics["clifford_t"]["cx"],
                metrics["clifford_t"]["t"], metrics["clifford_t"]["tdg"],
                metrics["total_non_clifford"], sha_hash
            ])

    def log_failure(self, circuit_name, qubits, opt_level, error):
        with open(self.fail_file, "a", newline="") as f:
            csv.writer(f).writerow([datetime.now().isoformat(), circuit_name, qubits, opt_level, str(error)])
