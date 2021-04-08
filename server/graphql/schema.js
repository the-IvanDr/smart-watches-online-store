const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User{ 
        id: ID
        name: String
        email: String
        password: String
        role: String
    }

    input UserInput{
        name: String!
        email: String!
        password: String!
        role: String!
    }


    type Device{
        id: ID
        name: String
        image: String
        price: Int
        old_price: Int
        is_novelty: Boolean
        description: String
        info: [DeviceInfo]
        brand: Brand
        type: Type
        comments: [Comment]
    }

    input DeviceInput{
        name: String!
        image: String!
        price: Int!
        old_price: Int
        is_novelty: Boolean!
        description: String!
        info: [DeviceInfoInput]!
        brandId: ID!
        typeId: ID!
    }

    type Basket{
        id: ID
        user: User
        devices: [Device]
    }

    type Brand{
        id: ID
        name: String
        icon: String
    }

    input BrandInput{
        name: String!
        icon: String!
    }

    type Type{
        id: ID
        name: String
    }

    input TypeInput{
        name: String!
    }

    type Type_Brand{
        brand: Brand
        types: [Type]
    }

    type DeviceInfo{
        id: ID
        title: String
        description: String
    }

    input DeviceInfoInput{
        title: String!
        description: String!
    }

    type Comment{
        id: ID
        text: String
        date: Date
        rate: Int
    }

    input CommentInput{
        text: String!
        rate: Int!
    }

    scalar Date

    type Query{
        getUser(id: Int): User
        getUsers: [User]

    }
    
    type Mutation{
        createUser(data: UserInput): User
        
        createType(data: TypeInput): Type
        createBrand(data: BrandInput): Brand
        connectBrandWithTypes(brandId: ID, typesId: [ID]): Type_Brand

        createDevice(data: DeviceInput): Device        
    }

`);

module.exports = schema;