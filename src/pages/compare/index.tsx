import { useCompareStore } from '@/libs/compareStore';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';

function ComparePage() {
  const { selectedItems } = useCompareStore();

  return (
    <PageLayout className="bg-background">
      <Navbar />
          {selectedItems.map((item, index) => (
            <div key={index} >
              <h3>{item.title}</h3>
              <p>{item.details}</p>
            </div>
          ))}
    </PageLayout>
  );
}

export default ComparePage;
