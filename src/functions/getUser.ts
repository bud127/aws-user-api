import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import middify from "../core/middify";
import formatJSONResponse from "../core/formatJsonResponse";
import userService from "../database/services";

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const id: string = event.pathParameters.id;
    try {
      const users = await userService.getUser(id);

      return formatJSONResponse(200, users);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);
