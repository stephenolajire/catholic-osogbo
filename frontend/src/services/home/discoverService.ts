import bishopMessageService, {
  type BishopMessage,
} from "../bishop/bishopMessageService";

export type DiscoverMessage = BishopMessage;

const discoverService = {
  getMessages: async (): Promise<DiscoverMessage[]> => {
    const response = await bishopMessageService.getMessages(1, 4);
    return response.messages;
  },

  getMessageById: async (id: string): Promise<DiscoverMessage> => {
    return bishopMessageService.getMessageById(id);
  },
};

export default discoverService;
