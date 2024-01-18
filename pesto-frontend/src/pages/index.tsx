import Layout from '@/components/Layout/index.component';
import TaskForm from '@/src/Forms/Task.form';

export default function Home() {
  return (
    <>
      <Layout>
        <div className="md:w-2/3 mx-auto mt-20">
          <TaskForm />
        </div>
      </Layout>
    </>
  );
}
