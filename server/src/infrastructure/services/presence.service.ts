export class PresenceService {
  private onlineUsers = new Map<string, number>();

  setOnline(userId: string): void {
    this.onlineUsers.set(userId, (this.onlineUsers.get(userId) || 0) + 1);
  }

  setOffline(userId: string): void {
    const count = this.onlineUsers.get(userId) || 0;
    if (count <= 1) this.onlineUsers.delete(userId);
    else this.onlineUsers.set(userId, count - 1);
    if (this.onlineUsers.get(userId) === 0) this.onlineUsers.delete(userId);
  }
  isOnline(userId: string): boolean {
    return this.onlineUsers.has(userId);
  }
}
