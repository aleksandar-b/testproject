const acl = {
    resources: {
        file: {
            organizations: {
                '1': {readAccess: '*'},
                '2': {readAccess: ['08448513-b980-4267-abeb-2445b4069a0c']},
            }
        }
    },

    canSee(idOrganization, resource, idResource) {
        const organization = acl.resources[resource]?.organizations?.[String(idOrganization)];
        if (!organization) {
            return false;
        }

        if (organization.readAccess === '*') {
            return true;
        }

        if (Array.isArray(organization.readAccess)) {
            return organization.readAccess.includes(idResource);
        }

        return false;
    },

    organization(idOrganization) {
        return {
            canSee(resource, idResource) {
                return acl.canSee(idOrganization, resource, idResource);
            },
        }
    }
}

module.exports = acl;