export type Receita = {
	id: number;
	valor: number;
	tipoReceita: "entrada" | "saida";
	poteId: number;
	categoria: string;
	descricao: string;
	criadoEm: number[];
};
