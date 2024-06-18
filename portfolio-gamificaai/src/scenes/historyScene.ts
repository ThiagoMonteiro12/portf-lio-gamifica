import { Actor, Color, Engine, FadeInOut, Keyboard, Keys, Resource, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";


export class historyScene extends Scene {
    elementoTexto?: HTMLElement

    //Método para esmaecer um elemento
    fadeOutElement(element: HTMLElement) {
        //Pegar opacidade do elemento HTML
        let opacidade = parseFloat(element.style.opacity)
        //Repetir diminuição da opacidade
        setInterval(() => {
            //Se o elemento aida está visivel
            if (opacidade > 0) {
                //Diminui a opacidade
                opacidade -= 0.01

                //Atualizar a opacidade do elemento
                element.style.opacity = opacidade.toString()
            }

        }, 10)

    }

    // Ao entrar ou sair da cena, utiliza o feito de transição lenta
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        //Criar elemento com a desrição da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement
        this.elementoTexto.style.opacity = "1"

        //nserir elementoTexto ao container game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        //Adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")


        this.elementoTexto.innerHTML = '<h2>Sobre o GamificaAi</h2><p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores, usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente, desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>';



        //Abobra
        let actorAbobra = new Actor({
            pos: vec(engine.drawWidth / 1.3, 430)
        })


        //Utilizar imagem do logo
        let imagemabobra = Resources.abobra.toSprite()

        // Aplicar zoom na imagem - 40% de x, e 40% de y
        imagemabobra.scale = vec(0.8, 0.8)

        // Configurar o actor para usar a imagem
        actorAbobra.graphics.add(imagemabobra)

        // Adicionando Actor Logo na tela
        this.add(actorAbobra)


        this.input.keyboard.on("press", (event) => {
            // Caso a tecla pressionada for "Enter", deve ir para a próxima cena
            if (event.key == Keys.Enter) {
                //Criar transição do elemento texto
                this.fadeOutElement(this.elementoTexto!)
                // Direciona para a cena Historia
                engine.goToScene("gamificacao")
            }
        })
    }
    onDeactivate(context: SceneActivationContext<undefined>): void {
        //Remover elemento texto da tela
        this.elementoTexto?.remove()

    }
}