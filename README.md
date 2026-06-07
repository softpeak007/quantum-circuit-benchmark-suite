🚀 QCBS – Quantum Circuit Benchmark Suite
Measure • Benchmark • Optimize • Reproduce Quantum Circuits




📖 Overview

QCBS (Quantum Circuit Benchmark Suite) is an open-source benchmarking framework built with Qiskit for generating, transpiling, benchmarking, and analyzing quantum circuits.

The project helps researchers, students, and developers compare quantum circuits using reproducible experiments and hardware-aware resource estimation.

✨ Features
✅ Automatic Quantum Circuit Generation
✅ Bell State Benchmark
✅ GHZ State Benchmark
✅ Quantum Fourier Transform (QFT)
✅ Draper QFT Adder Benchmark
✅ Ripple Carry Adder Benchmark
✅ Native Hardware Metrics
✅ Clifford+T Resource Estimation
✅ Experiment Registry
✅ CSV Export
✅ JSON Export
✅ Benchmark Leaderboard
✅ Reproducible Research Pipeline
📊 Benchmark Outputs

The benchmark engine automatically generates:

Circuit Depth
Gate Count
CX Count
T Count
T† Count
Native Hardware Metrics
Clifford+T Metrics
Experiment Logs
Benchmark Reports
🛠 Technology Stack
Python
Qiskit
Qiskit Aer
Pandas
Matplotlib
📂 Project Structure
qcbs_engine/
│
├── benchmarks/
├── core/
├── experiments/
├── results/
│   ├── experiment_log.csv
│   ├── leaderboard.csv
│   ├── summary.json
│   ├── benchmark_report.md
│   └── runs/
│
├── main.py
├── requirements.txt
├── README.md
└── LICENSE
🚀 Quick Start
Clone Repository
git clone https://github.com/softpeak007/quantum-circuit-benchmark-suite.git

cd quantum-circuit-benchmark-suite
Install Dependencies
pip install -r requirements.txt
Run Benchmark Suite
python main.py benchmark --small
🎯 Scientific Principles
Reproducible Experiments
Transparent Metric Extraction
Hardware-Aware Benchmarking
Fault-Tolerant Resource Estimation
Evidence-Driven Quantum Circuit Analysis
📈 Future Roadmap
🤖 AI Circuit Explanation Engine
📊 Streamlit Dashboard
📄 PDF Benchmark Reports
⚛️ Live Circuit Comparison
💡 AI Optimization Suggestions
📉 Hardware Cost Prediction
🔬 Advanced Quantum Benchmark Library
🤝 Contributions

Contributions are welcome.

Feel free to fork the repository, submit pull requests, or open issues to improve the project.

📜 License

This project is released under the MIT License.

⭐ Support

If you like this project, please consider giving it a ⭐ Star on GitHub.

Your support helps improve and expand the Quantum Circuit Benchmark Suite for the community.
