import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    elementoHTML?: HTMLElement

    private objetoInteracao: any
    private textodaCena: string = ""

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

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }
    onInitialize(engine: Engine<any>): void {
        this.elementoHTML = document.createElement("div") as HTMLElement


        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementoHTML)
        this.elementoHTML?.classList.add("gamificacao")
        this.backgroundColor = Color.Gray
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                this.fadeOutElement(this.elementoHTML!)
                engine.goToScene("exposicao")
            }
        }
        )


        let actorApresentacao = new Actor({
            pos: vec(engine.drawWidth / 4.3, 400)
        })

        let imageActor = Resources.greentech.toSprite()

        imageActor.scale = vec(0.2, 0.2)

        actorApresentacao.graphics.add(imageActor)

        this.add(actorApresentacao)

    }
    onActivate(context: SceneActivationContext<unknown>): void {
        this.objetoInteracao = context.data
        this.elementoHTML!.style.opacity = "1"
        console.log(this.objetoInteracao);


        this.elementoHTML!.style.opacity = "1"
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            this.elementoHTML!.innerHTML = "<h2>TechGear Solutions<h2> A TechGear Solutions é uma startup que desenvolve dispositivos tecnológicos wearable para monitoramento de saúde, mas ela encarava um problema de baixo engajamento de usuários com o aplicativo móvel após as primeiras semanas. A solução foi a Introdução de desafios diários, conquistas desbloqueáveis e um sistema de recompensas virtuais baseado em atividades físicas. Isso aumentou o engajamento e incentivou hábitos saudáveis.<p>"


        }
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            this.elementoHTML!.innerHTML = "<h2>EduLingo<h2> <p>EduLingo é uma plataforma educacional online que oferece cursos de idiomas para estudantes de todas as idades, seu problema era de manter os alunos motivados a longo prazo, especialmente quando enfrentavam dificuldades com a complexidade de aprender um novo idioma. Muitos alunos desistiam antes de alcançar fluência devido à falta de incentivo e progresso percebido. Para abordar essa questão, EduLingo incorporou elementos de gamificação em sua plataforma. Eles introduziram missões de aprendizado diárias, onde os alunos podem completar desafios específicos de vocabulário, gramática ou pronúncia. Além disso, criaram um sistema de pontos e distintivos que os alunos ganham ao completar lições e atingir marcos de aprendizado. Esses elementos não apenas mantiveram os alunos engajados, mas também promoveram uma competição saudável entre eles, aumentando a retenção e a satisfação geral. <p>"

        }
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            this.elementoHTML!.innerHTML = "<h2>GreenTech Solutions<h2> <p>GreenTech Solutions é uma empresa dedicada ao desenvolvimento de soluções sustentáveis para a indústria agrícola.Seu foco principal está na automação de processos agrícolas e no uso eficiente de recursos naturais. GreenTech Solutions enfrentava dificuldades em treinar seus funcionários de campo para utilizar novas tecnologias agrícolas de maneira eficaz e consistente.Muitos trabalhadores demonstravam resistência à adoção de novas práticas e tecnologias, afetando a produtividade e a eficiência operacional. A GreenTech Solutions resolveu a resistência dos funcionários à adoção de novas tecnologias agrícolas através de simulações interativas e competições gamificadas, melhorando eficiência e aceitação das práticas sustentáveis.<p>"
        }

    }
    onDeactivate(context: SceneActivationContext<undefined>): void {

        this.elementoHTML!.style.opacity = "0"

    }

}