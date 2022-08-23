import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import middify from "../core/middify";
import formatJSONResponse from "../core/formatJsonResponse";
import userService from "../database/services";
import UpdateUser from "../dtos/updateUserDto";

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent & UpdateUser,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const id: string = event.pathParameters.id;
    const { body } = event;
    try {
      body.updatedAt= new Date().toISOString();
      const users = await userService.updateUser(id, body);

      return formatJSONResponse(200, users);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);
