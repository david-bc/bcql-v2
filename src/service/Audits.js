import AuditsDummyResponse from './AuditsDummyResponse'
import Providers from './Providers'
export default {
    fetchAll: (filter, page, pageSize) => {
        AuditsDummyResponse.data = AuditsDummyResponse.data.map(al => {
            al.providerName = Providers.fetchById(al.providerId).providerName
            return al
        })
        return AuditsDummyResponse
    }

}
