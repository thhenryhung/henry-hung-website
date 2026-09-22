import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.string(),
    title: z.string(),
    descriptor: z.string(),
    problem: z.string(),
    built: z.string(),
    caseStudyProblem: z.string().optional(),
    caseStudyBuilt: z.string().optional(),
    metric: z.string(),
    metricCaption: z.string(),
    metricContext: z.string().optional(),
    context: z.string().optional(),
    role: z.string().optional(),
    team: z.string().optional(),
    scope: z.string().optional(),
    research: z.string().optional(),
    tag: z.string().optional(),
    hasCaseStudy: z.boolean().default(false),
    demoUrl: z.string().optional(),
    demoNote: z.string().optional(),
    screenshot: z.string().optional(),
    screenshotAlt: z.string().optional(),
    diagramLabels: z.array(z.string()).optional(),
    standfirst: z.string().optional(),
    bandMetrics: z
      .array(
        z.object({
          metric: z.string(),
          caption: z.string(),
        })
      )
      .optional(),
    pullQuote: z.string().optional(),
    pullQuoteCite: z.string().optional(),
    decisions: z
      .array(
        z.object({
          title: z.string(),
          chose: z.string(),
          over: z.string(),
          because: z.string(),
        })
      )
      .optional(),
    outcome: z.string().optional(),
  }),
});

export const collections = { projects };
