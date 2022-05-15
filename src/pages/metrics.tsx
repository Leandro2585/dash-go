import { withSSRAuth } from "@lib/with-ssr-auth"
import { setupExternalAPIClient } from "@services/api"

export default function Metrics () {
  return (
    <>
      <h1>Metrics</h1>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupExternalAPIClient(context)
  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})