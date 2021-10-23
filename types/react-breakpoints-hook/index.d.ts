declare module "react-breakpoints-hook" {
  type BreakpointsResponse = {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
  };

  type BreakpointMinMax = {
    min: number | null;
    max: number | null;
  };

  type BreakpointsConfig = {
    xs: BreakpointMinMax;
    sm: BreakpointMinMax;
    md: BreakpointMinMax;
    lg: BreakpointMinMax;
  };

  export declare function useBreakpoints(
    config: BreakpointsConfig
  ): BreakpointsResponse;
}
