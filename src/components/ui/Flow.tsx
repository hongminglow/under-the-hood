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
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-8 w-full overflow-x-auto pb-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col border border-border bg-card text-card-foreground p-4 rounded-xl shadow-sm min-w-[200px] flex-1">
            <h4 className="font-semibold text-base mb-2">{step.title}</h4>
            {step.description && <p className="text-sm text-muted-foreground">{step.description}</p>}
          </div>
          {index < steps.length - 1 && (
             <div className="flex items-center text-muted-foreground shrink-0 flex-col justify-center">
               {/* Right Arrow (Desktop) */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden md:block">
                 <path d="M5 12h14" />
                 <path d="m12 5 7 7-7 7" />
               </svg>
               {/* Down Arrow (Mobile) */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:hidden">
                 <path d="M12 5v14" />
                 <path d="m19 12-7 7-7-7" />
               </svg>
             </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
