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

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

interface MediumPost {
  guid: string;
  title: string;
  pubDate: string;
  link: string;
  content: string;
}

interface MediumResponse {
  items: MediumPost[];
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

export default async function PersonalWebsite() {
  const [githubProjects, mediumPosts] = await Promise.all([
    getGitHubProjects(),
    getMediumPosts(),
  ]);

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
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {githubProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.name}
                  description={
                    project.description || "No description available."
                  }
                  url={project.html_url}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="https://github.com/drac94?tab=repositories"
                className="text-blue-500 hover:underline"
              >
                View more projects
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediumPosts.map((post) => (
                <BlogPostCard
                  key={post.guid}
                  title={post.title}
                  content={post.content}
                  url={post.link}
                  date={new Date(post.pubDate).toLocaleDateString()}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="https://ludwiguer.medium.com/"
                className="text-blue-500 hover:underline"
              >
                View more blog posts
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
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <Link
          href={url}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          View on GitHub
        </Link>
      </CardContent>
    </Card>
  );
}

function BlogPostCard({
  title,
  content,
  url,
  date,
}: {
  title: string;
  content: string;
  url: string;
  date: string;
}) {
  const truncateContent = (content: string, maxLength: number) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    if (strippedContent.length <= maxLength) return strippedContent;
    return strippedContent.slice(0, maxLength) + "...";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {truncateContent(content, 150)}
        </div>
        <Link href={url} className="text-blue-500 hover:underline">
          Read more
        </Link>
      </CardContent>
    </Card>
  );
}
