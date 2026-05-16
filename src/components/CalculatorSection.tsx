import { useState, useEffect, useRef } from "react";
import { Calculator, type CalcInitialValues } from "./Calculator";
import { SimpleEstimator } from "./SimpleEstimator";

type Mode = "simple" | "advanced";

interface Props {
  initialValues?: CalcInitialValues;
}

export function CalculatorSection({ initialValues }: Props) {
  const [mode, setMode] = useState<Mode>("simple");
  const [advancedValues, setAdvancedValues] = useState<CalcInitialValues | undefined>();
  const prevInitialRef = useRef<CalcInitialValues | undefined>(undefined);

  // When parent passes new initialValues (e.g. scenario card click), switch to advanced
  useEffect(() => {
    if (initialValues && initialValues !== prevInitialRef.current) {
      prevInitialRef.current = initialValues;
      setAdvancedValues(initialValues);
      setMode("advanced");
    }
  }, [initialValues]);

  function handleUseEstimateInCalc(values: CalcInitialValues) {
    setAdvancedValues(values);
    setMode("advanced");
    // Small scroll adjustment so the toggle is visible
    setTimeout(() => {
      document.getElementById("kalkylator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex items-center border-b border-gray-100 mb-8">
        <button
          onClick={() => setMode("simple")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-all ${
            mode === "simple"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
          aria-pressed={mode === "simple"}
        >
          Beskriv din idé
        </button>
        <button
          onClick={() => setMode("advanced")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-all ${
            mode === "advanced"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
          aria-pressed={mode === "advanced"}
        >
          Räkna manuellt
        </button>
      </div>

      {mode === "simple" ? (
        <SimpleEstimator onUseInCalculator={handleUseEstimateInCalc} />
      ) : (
        <Calculator initialValues={advancedValues} />
      )}
    </div>
  );
}
