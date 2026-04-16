export interface AuditLogResponse {
  id: string;
  organization_id: string;
  user_id: string | null;
  actor_name: string;
  action: string;
  target_id: string | null;
  target_type: string;
  details: string | null;
  ip_address: string | null;
  timestamp: string;
}
