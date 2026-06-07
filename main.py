import argparse
import json
from benchmarks.runner import BenchmarkRunner

def main():
    parser = argparse.ArgumentParser(description="QCBS Engine")
    subparsers = parser.add_subparsers(dest="command")

    bench = subparsers.add_parser("benchmark")
    bench.add_argument("--small", action="store_true")

    args = parser.parse_args()

    if args.command == "benchmark":
        runner = BenchmarkRunner()
        runner.run_suite(small=args.small)
        print(json.dumps({"status": "benchmark_completed"}, indent=4))
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
