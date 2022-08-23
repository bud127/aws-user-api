import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as uuid from "uuid";
import middify from "../core/middify";
import formatJSONResponse from "../core/formatJsonResponse";
import userService from "../database/services";
import CreateUser from "../dtos/createUserDto";

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent & CreateUser,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const { name, password } = event.body;

    try {
      const id: string = uuid.v4();
      const user = await userService.createUser({
        id,
        name,
        password,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        deletedAt:null
      });

      return formatJSONResponse(201, user);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);
