import { Suspense } from 'react'
import LoginComponent from './LoginComponent'

export default function HomeComponent() {
  return (
    <div>
      <Suspense fallback={<p>...Loading</p>}>
          <LoginComponent />
        </Suspense>
    </div>
  )
}
