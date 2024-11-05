import {
  SiGithub,
  SiLinkedin,
  SiMedium,
  SiBluesky,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiTypescript,
  SiNodedotjs,
  SiRemix,
  SiRadixui,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, FileCode2, GitFork, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

interface MediumPost {
  guid: string;
  title: string;
  pubDate: string;
  link: string;
  content: string;
  thumbnail: string;
  categories: string[];
}

interface MediumResponse {
  items: MediumPost[];
}

interface ContributionDay {
  date: string;
  count: number;
}

async function getGitHubProjects(): Promise<GitHubRepo[]> {
  const res = await fetch(
    "https://api.github.com/users/drac94/repos?sort=updated&per_page=4",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub projects");
  return res.json();
}

async function getMediumPosts(): Promise<MediumPost[]> {
  const res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ludwiguer",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Medium posts");
  const data: MediumResponse = await res.json();
  return data.items.slice(0, 3);
}

async function getGitHubContributions(): Promise<ContributionDay[]> {
  const res = await fetch(
    "https://github-contributions-api.jogruber.de/v4/drac94?y=last"
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub contributions");
  const data = await res.json();
  return data.contributions;
}

function getContributionColor(count: number): string {
  if (count === 0) return "bg-gray-100 dark:bg-gray-800";
  if (count < 2) return "bg-green-100 dark:bg-green-900";
  if (count < 4) return "bg-green-300 dark:bg-green-700";
  return "bg-green-500 dark:bg-green-500";
}

export default async function PersonalWebsite() {
  const [githubProjects, mediumPosts, contributions] = await Promise.all([
    getGitHubProjects(),
    getMediumPosts(),
    getGitHubContributions(),
  ]);

  // Organize contributions into weeks
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Luis Guerrero</h1>
          <p className="text-xl">Software Engineer</p>
          <div className="mt-4 flex space-x-4">
            <Link
              href="https://github.com/drac94"
              className="text-white hover:text-gray-200"
            >
              <SiGithub className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/ludwiguer"
              className="text-white hover:text-gray-200"
            >
              <SiLinkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://ludwiguer.medium.com/"
              className="text-white hover:text-gray-200"
            >
              <SiMedium className="h-6 w-6" />
              <span className="sr-only">Medium</span>
            </Link>
            <Link
              href="https://bsky.app/profile/luisguerrero.me"
              className="text-white hover:text-gray-200"
            >
              <SiBluesky className="h-6 w-6" />
              <span className="sr-only">Bluesky</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-lg">
              {`I'm a passionate software engineer specializing in modern web
              technologies. With a strong foundation in JavaScript and
              TypeScript, I create robust and efficient applications using React
              and Next.js.`}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SkillCard
                icon={<SiTypescript className="h-8 w-8" />}
                skill="JavaScript / TypeScript"
              />
              <SkillCard icon={<SiReact className="h-8 w-8" />} skill="React" />
              <SkillCard
                icon={<SiNextdotjs className="h-8 w-8" />}
                skill="Next.js"
              />
              <SkillCard
                icon={<SiTailwindcss className="h-8 w-8" />}
                skill="Tailwind CSS"
              />
              <SkillCard
                icon={<SiRadixui className="h-8 w-8" />}
                skill="Radix UI"
              />
              <SkillCard
                icon={<SiShadcnui className="h-8 w-8" />}
                skill="shadcn/ui"
              />
              <SkillCard
                icon={<SiNodedotjs className="h-8 w-8" />}
                skill="Node.js"
              />
              <SkillCard icon={<SiRemix className="h-8 w-8" />} skill="Remix" />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {githubProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.name}
                  description={
                    project.description || "No description available."
                  }
                  url={project.html_url}
                  stars={project.stargazers_count}
                  forks={project.forks_count}
                  language={project.language || "Not specified"}
                  topics={project.topics || []}
                />
              ))}
            </div>
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>{`Last Year's Contributions`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto">
                    <div className="flex justify-between gap-1 min-w-full">
                      <TooltipProvider>
                        {weeks.map((week, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((day) => (
                              <Tooltip key={day.date}>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`w-3 h-3 ${getContributionColor(
                                      day.count
                                    )}`}
                                    role="gridcell"
                                    aria-label={`${
                                      day.count
                                    } contributions on ${new Date(
                                      day.date
                                    ).toLocaleDateString()}`}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {day.count} contributions on{" "}
                                    {new Date(day.date).toLocaleDateString()}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-start items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="mr-2">Less</span>
                    <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800"></div>
                    <div className="w-3 h-3 bg-green-100 dark:bg-green-900"></div>
                    <div className="w-3 h-3 bg-green-300 dark:bg-green-700"></div>
                    <div className="w-3 h-3 bg-green-500 dark:bg-green-500"></div>
                    <span className="ml-2">More</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="https://github.com/drac94?tab=repositories"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                View more on Github
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediumPosts.map((post) => (
                <BlogPostCard
                  key={post.guid}
                  title={post.title}
                  content={post.content}
                  url={post.link}
                  date={new Date(post.pubDate)}
                  thumbnail={post.thumbnail}
                  categories={post.categories || []}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="https://ludwiguer.medium.com/"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                target="_blank"
              >
                View more on Medium
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function SkillCard({ icon, skill }: { icon: React.ReactNode; skill: string }) {
  return (
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {icon}
      <span className="ml-3 font-medium">{skill}</span>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  url,
  stars,
  forks,
  language,
  topics,
}: {
  title: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link href={url} className="hover:underline">
            {title}
          </Link>
          <div className="flex items-center space-x-2 text-sm">
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {stars}
            </span>
            <span className="flex items-center">
              <GitFork className="w-4 h-4 mr-1" />
              {forks}
            </span>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic) => (
            <Badge key={topic} variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="flex items-center">
            <FileCode2 className="w-4 h-4 mr-2" />
            {language}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogPostCard({
  title,
  content,
  url,
  date,
  categories,
}: {
  title: string;
  content: string;
  url: string;
  date: Date;
  thumbnail: string;
  categories: string[];
}) {
  const truncateContent = (content: string, maxLength: number) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    if (strippedContent.length <= maxLength) return strippedContent;
    return strippedContent.slice(0, maxLength) + "...";
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="line-clamp-2 hover:underline">
          <Link href={url}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
        <CardDescription className="line-clamp-3 mb-4">
          {truncateContent(content, 150)}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{date.toLocaleDateString()}</span>
          <Clock className="w-4 h-4 ml-4 mr-2" />
          <span>{Math.ceil(content.length / 200)} min read</span>
        </div>
      </CardContent>
    </Card>
  );
}
