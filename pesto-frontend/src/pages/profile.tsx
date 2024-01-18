import Layout from '@/components/Layout/index.component'
import TaskForm from '@/src/Forms/Task.form'
import ProfileForm from '../Forms/Profile.form'


export default function Profile() {
  return (
    <>
      <Layout>
        <div className='flex h-full items-center justify-center'>
          <ProfileForm  />
        </div>
      </Layout>
    </>
  )
}
