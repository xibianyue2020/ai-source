import { Search, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function HeroSearch() {
  return (
    <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            AI 工具生态平台
          </h1>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          发现、分享和改进最优秀的 AI 提示词、MCP 工具、Dify 应用和自动化工作流
        </p>

        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="搜索提示词、工具、工作流..." 
            className="pl-12 pr-24 py-6 text-lg border-2 border-primary/20 focus:border-primary"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6">
            搜索
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="text-sm text-muted-foreground">热门标签：</span>
          {["ChatGPT", "写作助手", "代码生成", "数据分析", "创意设计"].map((tag) => (
            <Button key={tag} variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}