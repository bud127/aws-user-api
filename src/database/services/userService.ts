import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../../models/User";

class UserService {
  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async getAllUsers(): Promise<User[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as User[];
  }

  async getUser(id: string): Promise<User> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();

    return result.Item as User;
  }

  async createUser(user: User): Promise<User> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: user,
      })
      .promise();

    return user;
  }

  async updateUser(id: string, partialUser: Partial<User>): Promise<User> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression:
          "set #name = :name, password = :password, updatedAt= :updatedAt",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": partialUser.name,
          ":password": partialUser.password,
          ":updatedAt": partialUser.updatedAt
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as User;
  }

  async deleteUser(id: string) {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression:
          "set deletedAt= :deletedAt",
        ExpressionAttributeValues: {
          ":deletedAt":  new Date().toISOString()
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as User;
  }
}

export default UserService;
