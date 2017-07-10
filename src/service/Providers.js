import ProviderDummies from './ProviderDummies'
export default {
    fetchById(id) {
        return ProviderDummies[id];
    }
}