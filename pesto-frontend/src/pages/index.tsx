import Layout from '@/components/Layout/index.component';
import TaskShower from '@/components/TaskShower';

export default function Home() {
  return (
    <>
      <Layout>
        <div className="md:w-2/3 mx-auto mt-20">
         <TaskShower />
        </div>
      </Layout>
    </>
  );
}
