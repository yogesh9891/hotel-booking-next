export const UserList = (payload) => {
    console.log(payload, ' payload.role');
    let pipeline = [],
        matchCondition = {},
        sortCondition = {};

    if (payload.role != "" && payload.role) {
        matchCondition.role = { $regex: new RegExp(`\\s+${payload.role.trim()}|${payload.role.trim()}`) }; //, $options: "-i" 
    };

    sortCondition = { createdAt: -1 };

    pipeline.push({ $match: matchCondition }, {
        $project: {
            _id: 1,
            firstName: 1,
            email: 1,
            phone: 1,
            role: 1,
            lastName: 1,
            role: 1,
            isDeleted: 1,
            isApproved: 1,
            isActive: 1,
            createdAt: 1,
        },
    }, { $sort: sortCondition });

    return pipeline;
};
// stateName: 1,
// pincode: 1,
// language: 1,
// isActive: 1,

// visitingCard: 1,
// shopImage: 1,
// onlinePortal: 1,
// kycStatus: 1,