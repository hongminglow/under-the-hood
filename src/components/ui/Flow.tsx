import React from "react";

export interface FlowStep {
  title: string;
  description?: React.ReactNode;
}

export interface FlowProps {
  steps: FlowStep[];
}

export function Flow({ steps }: FlowProps) {
  return (
    <div className="my-8 w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex flex-col items-stretch gap-4 px-1 md:inline-flex md:min-w-max md:flex-row md:items-stretch">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full flex-col rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm md:h-auto md:w-[240px] md:flex-none self-stretch">
              <h4 className="mb-2 text-base font-semibold">{step.title}</h4>
              {step.description && (
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="flex shrink-0 flex-col items-center justify-center text-muted-foreground">
                {/* Right Arrow (Desktop) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hidden md:block"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                {/* Down Arrow (Mobile) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:hidden"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
