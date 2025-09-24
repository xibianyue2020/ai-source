import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ResourceDetailPage } from './components/ResourceDetailPage';
import { NodesPage } from './components/NodesPage';
import { ProfilePage } from './components/ProfilePage';
import { IncentivePage } from './components/IncentivePage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);

  const handleResourceClick = (resourceId: string) => {
    setSelectedResourceId(resourceId);
    setActiveTab('resource-detail');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'resource-detail') {
      setSelectedResourceId(null);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onResourceClick={handleResourceClick} />;
      case 'resource-detail':
        return selectedResourceId ? (
          <ResourceDetailPage resourceId={selectedResourceId} />
        ) : (
          <HomePage onResourceClick={handleResourceClick} />
        );
      case 'nodes':
        return <NodesPage />;
      case 'community':
        return (
          <div className="max-w-7xl mx-auto px-6 py-8 text-center">
            <h1 className="text-3xl mb-4">🌟 社区功能</h1>
            <p className="text-muted-foreground">
              社区功能正在开发中，敬请期待...
            </p>
          </div>
        );
      case 'incentive':
        return <IncentivePage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onResourceClick={handleResourceClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      <main>
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">关于资源市场</h3>
              <p className="text-sm text-muted-foreground">
                构建开发者资源分享生态，让知识传播更高效，让创新更容易。
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">资源中心</a></li>
                <li><a href="#" className="hover:text-foreground">分节点</a></li>
                <li><a href="#" className="hover:text-foreground">开发者指南</a></li>
                <li><a href="#" className="hover:text-foreground">API 文档</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">社区</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">讨论区</a></li>
                <li><a href="#" className="hover:text-foreground">问题反馈</a></li>
                <li><a href="#" className="hover:text-foreground">功能建议</a></li>
                <li><a href="#" className="hover:text-foreground">开源贡献</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">联系我们</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>邮箱: contact@ecosys.dev</li>
                <li>微信群: 资源市场开发者</li>
                <li>GitHub: @ecosys-platform</li>
                <li>微博: @资源市场平台</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2024 资源市场平台. 保留所有权利.</p>
            <p>版本 v2.1.4 | 构建 20240115</p>
          </div>
        </div>
      </footer>
    </div>
  );
}