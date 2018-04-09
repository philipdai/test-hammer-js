export interface Gift {
	id: string;
	role: string;
	giftName: string;
	who?: string;
	amount: number;
	note: string;
	giftType: string;
	weddingId: string;
}
