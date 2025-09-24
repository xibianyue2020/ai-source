import { useState } from "react";
import { Navigation } from "./components/navigation";
import { HeroSearch } from "./components/hero-search";
import { CategoryFilter } from "./components/category-filter";
import { ResourceCard } from "./components/resource-card";
import { ResourceDetail } from "./components/resource-detail";
import { BranchNodes } from "./components/branch-nodes";
import { UserProfile } from "./components/user-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

// Mock data for resources
const mockResources = {
  official: [
    {
      title: "GPT-4 智能写作助手",
      description: "官方推荐的高效写作提示词模板，支持多种文体和场景，帮助提升写作质量和效率。",
      category: "提示词" as const,
      rating: 4.9,
      downloads: 15420,
      views: 28350,
      tags: ["写作", "GPT-4", "模板"],
      author: "OpenAI官方",
      image: "https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODY2NzczMnww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      title: "MCP 文件管理器",
      description: "强大的模型上下文协议工具，实现文件的智能管理和批量处理功能。",
      category: "MCP" as const,
      rating: 4.8,
      downloads: 8920,
      views: 16780,
      tags: ["文件管理", "MCP", "批处理"],
      author: "Anthropic团队",
      image: "https://images.unsplash.com/photo-1753715613388-7e03410b1dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMHdvcmtmbG93fGVufDF8fHx8MTc1ODY5Njg3OHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ],
  featured: [
    {
      title: "Dify 客服机器人模板",
      description: "基于Dify平台的智能客服解决方案，支持多轮对话和知识库检索。",
      category: "Dify工具" as const,
      rating: 4.7,
      downloads: 12560,
      views: 23450,
      tags: ["客服", "Dify", "对话"],
      author: "AI开发者",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTg1ODg1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      title: "代码审查工作流",
      description: "自动化代码审查流程，集成静态分析和AI代码建议，提升代码质量。",
      category: "工作流" as const,
      rating: 4.6,
      downloads: 7830,
      views: 14920,
      tags: ["代码审查", "自动化", "CI/CD"],
      author: "DevOps专家",
      image: "https://images.unsplash.com/photo-1740174459717-3833cb537bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHRvb2xzfGVufDF8fHx8MTc1ODYzMzgyMHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ],
  popular: [
    {
      title: "AI 图像生成提示词库",
      description: "收录了数千个高质量的AI图像生成提示词，覆盖各种艺术风格和应用场景。",
      category: "提示词" as const,
      rating: 4.8,
      downloads: 25670,
      views: 45230,
      tags: ["图像生成", "Midjourney", "DALL-E"],
      author: "创意工作室",
      image: "https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODY2NzczMnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "数据分析MCP工具包",
      description: "专业的数据分析MCP工具集，支持Excel、CSV处理和可视化图表生成。",
      category: "MCP" as const,
      rating: 4.7,
      downloads: 18920,
      views: 32150,
      tags: ["数据分析", "Excel", "可视化"],
      author: "数据科学家",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTg1ODg1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ],
  latest: [
    {
      title: "多模态提示词生成器",
      description: "最新发布的多模态AI提示词自动生成工具，支持文本、图像、音频等多种模态。",
      category: "提示词" as const,
      rating: 4.5,
      downloads: 3240,
      views: 8760,
      tags: ["多模态", "生成器", "新功能"],
      author: "AI研究员",
      image: "https://images.unsplash.com/photo-1753715613388-7e03410b1dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMHdvcmtmbG93fGVufDF8fHx8MTc1ODY5Njg3OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "智能邮件处理工作流",
      description: "基于AI的邮件自动分类和回复工作流，大幅提升邮件处理效率。",
      category: "工作流" as const,
      rating: 4.4,
      downloads: 1890,
      views: 5420,
      tags: ["邮件处理", "自动化", "效率"],
      author: "效率专家",
      image: "https://images.unsplash.com/photo-1740174459717-3833cb537bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHRvb2xzfGVufDF8fHx8MTc1ODYzMzgyMHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ]
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentView, setCurrentView] = useState<"home" | "detail" | "branches" | "profile" | "community" | "incentives">("home");
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const handleNavigationClick = (view: "home" | "branches" | "profile" | "community" | "incentives") => {
    setCurrentView(view);
  };

  const handleResourceClick = (resource: any) => {
    setSelectedResource({
      ...resource,
      id: "1",
      version: "v2.1.0",
      updatedAt: "2025-01-20",
      longDescription: "这是一个功能强大的AI写作助手提示词模板，经过精心设计和优化，能够帮助用户在各种写作场景中获得更好的AI输出结果。模板涵盖了文章写作、创意文案、技术文档、学术论文等多个领域，每个模板都经过实际测试和用户验证，确保效果优异。",
      documentation: `# 使用说明

## 基础用法
1. 复制提示词模板
2. 根据需要替换占位符
3. 输入到AI模型中使用

## 高级技巧
- 可以根据具体需求调整语气和风格
- 支持多语言输出
- 可以与其他工具链结合使用

## 示例
\`\`\`
请以[风格]的语气，为[目标用户]写一篇关于[主题]的[文体类型]...
\`\`\`

## 注意事项
- 确保输入内容符合AI使用规范
- 建议先进行小规模测试
- 可以根据输出结果进行提示词微调`
    });
    setCurrentView("detail");
  };

  if (currentView === "detail" && selectedResource) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onNavigate={handleNavigationClick} />
        <ResourceDetail 
          resource={selectedResource}
          onBack={() => setCurrentView("home")}
        />
      </div>
    );
  }

  if (currentView === "branches") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onNavigate={handleNavigationClick} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BranchNodes />
        </div>
      </div>
    );
  }

  if (currentView === "profile") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onNavigate={handleNavigationClick} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UserProfile />
        </div>
      </div>
    );
  }

  if (currentView === "community") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onNavigate={handleNavigationClick} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">社区功能</h1>
            <p className="text-muted-foreground mb-6">社区功能正在开发中，敬请期待！</p>
            <Button onClick={() => setCurrentView("home")}>
              返回首页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "incentives") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onNavigate={handleNavigationClick} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">激励系统</h1>
            <p className="text-muted-foreground mb-6">激励系统正在开发中，敬请期待！</p>
            <Button onClick={() => setCurrentView("home")}>
              返回首页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={handleNavigationClick} />
      <HeroSearch />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <Tabs defaultValue="official" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="official">官方资源</TabsTrigger>
            <TabsTrigger value="featured">精选资源</TabsTrigger>
            <TabsTrigger value="popular">热门资源</TabsTrigger>
            <TabsTrigger value="latest">最新资源</TabsTrigger>
          </TabsList>

          <TabsContent value="official" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockResources.official.map((resource, index) => (
                <div key={index} onClick={() => handleResourceClick(resource)} className="cursor-pointer">
                  <ResourceCard {...resource} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockResources.featured.map((resource, index) => (
                <div key={index} onClick={() => handleResourceClick(resource)} className="cursor-pointer">
                  <ResourceCard {...resource} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockResources.popular.map((resource, index) => (
                <div key={index} onClick={() => handleResourceClick(resource)} className="cursor-pointer">
                  <ResourceCard {...resource} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="latest" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockResources.latest.map((resource, index) => (
                <div key={index} onClick={() => handleResourceClick(resource)} className="cursor-pointer">
                  <ResourceCard {...resource} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-secondary/50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 AI 生态工具平台. 版本 v1.0.0</p>
            <p className="mt-2">致力于构建开放、协作的 AI 工具生态系统</p>
          </div>
        </div>
      </footer>
    </div>
  );
}