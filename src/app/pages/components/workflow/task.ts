export class Task {
  TaskId?: number;
  TaskTitle?: String = "";
  TaskDate?: String = "";
  Comments?: String = "";
  TransactionId?: number;
  TransactionType?: number;
  AllowedAction?: number;
  UserActionId?: number;
  CommentAllowed?: boolean;
  CommentMandatory?: boolean;
}
