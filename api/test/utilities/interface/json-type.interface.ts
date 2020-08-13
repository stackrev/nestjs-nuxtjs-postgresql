export default interface JsonType {
  field: string;
  type: string | string[];
  subs?: JsonType[];
}
